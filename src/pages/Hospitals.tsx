import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchHospitals } from "../services/hospitals";
import axios from "axios";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// styled: 지도 아이콘 설정 //
const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = defaultIcon;

// component: 지도를 조작할 수 있도록 mapRef를 설정하는 컴포넌트 //
const MapController = ({ mapRef }: { mapRef: React.MutableRefObject<any> }) => {
    const map = useMap();
    useEffect(() => {
        if (map) {
            mapRef.current = map;
        }
    }, [map]);
    return null;
};

// component: 병원 데이터를 불러와 목록 및 지도 표시 컴포넌트 //
const Hospitals = () => {

    // state: 병원 목록, 로딩 상태, 검색어, 선택된 병원 인덱스 관리 //
    const [hospitals, setHospitals] = useState<
        { name: string; addr: string; tel: string; lat: number; lng: number }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedHospital, setSelectedHospital] = useState<number | null>(null);

    // ref: 지도 및 마커 참조 //
    const mapRef = useRef<any>(null);
    const markerRefs = useRef<Map<number, any>>(new Map());
    
    // effect: 병원 데이터를 API에서 가져와 상태 업데이트 //
    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();

        // function: 병원 데이터 로드 함수 //
        const loadHospitals = async () => {
            setLoading(true);
            try {
                const allHospitals: {
                    name: string;
                    addr: string;
                    tel: string;
                    lat: number;
                    lng: number;
                }[] = [];
                const maxPages = 3;
                const pageSize = 15;
                const hospitalSet = new Set();

                for (let pageIndex = 1; pageIndex <= maxPages; pageIndex++) {
                    const data = await fetchHospitals(pageIndex, pageSize, cancelTokenSource.token);
                    const rows = data.Animalhosptl?.[1]?.row;

                    if (!rows || !Array.isArray(rows)) break;

                    rows.forEach((item: any) => {
                        const name = item.BIZPLC_NM || "병원 이름 없음";
                        const addr = item.REFINE_ROADNM_ADDR || "주소 없음";
                        const tel = item.LOCPLC_FACLT_TELNO || "전화번호 없음";
                        const lat = parseFloat(item.REFINE_WGS84_LAT);
                        const lng = parseFloat(item.REFINE_WGS84_LOGT);
                        const uniqueKey = `${name}_${addr}`;

                        if (!hospitalSet.has(uniqueKey) && !isNaN(lat) && !isNaN(lng)) {
                            hospitalSet.add(uniqueKey);
                            allHospitals.push({ name, addr, tel, lat, lng });
                        }
                    });
                }

                setHospitals(allHospitals);
            } catch (error: any) {
                if (!axios.isCancel(error)) console.error("병원 데이터를 불러오는 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        loadHospitals();
        return () => {
            cancelTokenSource.cancel("요청이 컴포넌트 언마운트로 인해 취소되었습니다.");
        };
    }, []);

    // event handler: 병원 클릭 시 지도 이동 및 팝업 열기 이벤트 핸들러 //
    const markerClickhandler = (lat: number, lng: number, index: number) => {
        if (mapRef.current) {
            mapRef.current.flyTo([lat, lng], 15, { animate: true });
        }
        // 해당 병원의 마커 팝업 열기
        const marker = markerRefs.current.get(index);
        if (marker) {
            marker.openPopup();
        }
    
        // 선택한 병원 상태 업데이트
        setSelectedHospital(index);
    };

    // variable: 검색어 기반 병원 필터링 //
    const filteredHospitals = hospitals.filter(
        (hospital) =>
            hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.addr.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // render: Hospitals 컴포넌트 렌더링 //
    return (
        <div className="relative min-h-screen min-w-screen py-24 px-32 flex flex-col md:flex-col">
            
            <div className="mb-6">
                <div className="flex justify-between items-end pb-4 sm:pb-6 lg:pb-10">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#172554] font-bold text-start leading-none">병원</div>
                    <div className="text-3xl text-[#172554] font-bold leading-none hidden md:block">Hospitals</div>
                </div>
                <hr className="border-b border-gray-300" />
            </div>

            <div className="flex md:flex-row w-full pt-8">
                {/* 병원 목록 (왼쪽) */}
                <div className="md:w-50 lg:w-80 bg-white flex flex-col h-[calc(100vh-64px)]">
                    
                    <div className="sticky top-0 p-4 z-10 bg-white">
                        <h2 className="text-lg font-bold mb-3">병원 목록</h2>
                        <input
                            type="text"
                            placeholder="병원 이름이나 주소를 검색하세요."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border-b focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
    {loading ? (
        <p className="text-center">로딩 중...</p>
    ) : filteredHospitals.length > 0 ? (
        filteredHospitals.map((hospital, index) => (
            <div
                key={index}
                onClick={() => markerClickhandler(hospital.lat, hospital.lng, index)}
                className={`p-3 border-b cursor-pointer hover:bg-gray-200 transition ${
                    selectedHospital === index ? "bg-gray-200" : ""
                }`}
            >
                <h3 className="font-semibold">{hospital.name}</h3>
                <p className="text-sm text-gray-600">{hospital.addr}</p>
            </div>
        ))
    ) : (
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
    )}
</div>

                </div>

                {/* 지도 컨테이너 (오른쪽) */}
                <div className="map-container flex-1 h-[calc(100vh-64px)]">
                    <MapContainer
                        center={[37.5665, 126.978]}
                        zoom={10}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <MapController mapRef={mapRef} />
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {hospitals.map((hospital, index) => (
                            <Marker
                                key={index}
                                position={[hospital.lat, hospital.lng]}
                                ref={(el) => markerRefs.current.set(index, el)}
                            >
                                <Popup>
                                    <div>
                                        <h2 className="font-bold">{hospital.name}</h2>
                                        <p>{hospital.addr}</p>
                                        <p>{hospital.tel}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Hospitals;
