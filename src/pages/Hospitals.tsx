import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchHospitals } from "../services/hospitals";
import axios from "axios";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = defaultIcon;

const MapController = ({ mapRef }: { mapRef: React.MutableRefObject<any> }) => {
    const map = useMap();
    useEffect(() => {
        if (map) {
            mapRef.current = map;
        }
    }, [map]);
    return null;
};

const Hospitals = () => {
    const [hospitals, setHospitals] = useState<
        { name: string; addr: string; tel: string; lat: number; lng: number }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 검색어 상태 추가
    const mapRef = useRef<any>(null);
    const markerRefs = useRef<Map<number, any>>(new Map());

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();

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

    // 📌 병원 목록 클릭 시 지도 중앙으로 이동 + 마커 팝업 열기
    const handleMarkerClick = (lat: number, lng: number, index: number) => {
        if (mapRef.current) {
            mapRef.current.flyTo([lat, lng], 15, { animate: true });
        }
        // 📌 해당 병원의 마커 팝업 열기
        const marker = markerRefs.current.get(index);
        if (marker) {
            marker.openPopup();
        }
    };

    // 🔍 검색어 입력 시 병원 목록 필터링
    const filteredHospitals = hospitals.filter(
        (hospital) =>
            hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.addr.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="map-container relative min-h-screen min-w-screen py-24 px-32 flex flex-col md:flex-col">
            {/* 사이드바 */}
            <div className="flex justify-between items-end pb-4 sm:pb-6 lg:pb-10 pt-14">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#172554] font-bold text-start leading-none">병원</div>
                <div className="text-3xl text-[#172554] font-bold leading-none hidden md:block">hospitals</div>
            </div>
            <hr className="border-b border-gray-300 mb-6" />

            <div className="flex md:flex-row w-full pt-8">
                <div className="w-full md:w-80 h-[calc(100vh-64px)] bg-white  p-4 overflow-y-auto">
                    <h2 className="text-lg font-bold mb-3">병원 목록</h2>

                    <input
                        type="text"
                        placeholder="병원 이름이나 주소를 검색하세요."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {loading ? (
                        <p className="text-center">로딩 중...</p>
                    ) : filteredHospitals.length > 0 ? (
                        filteredHospitals.map((hospital, index) => (
                            <div
                                key={index}
                                onClick={() => handleMarkerClick(hospital.lat, hospital.lng, index)}
                                className="p-3 border-b cursor-pointer hover:bg-gray-200 transition"
                            >
                                <h3 className="font-semibold">{hospital.name}</h3>
                                <p className="text-sm text-gray-600">{hospital.addr}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
                    )}
                </div>

                {/* 지도 컨테이너 */}
                <div className="flex-1 h-[calc(100vh-64px)]">
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
