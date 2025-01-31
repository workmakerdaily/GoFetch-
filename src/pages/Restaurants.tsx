import { useEffect, useState } from "react";
import { fetchAllRestaurants, fetchRestaurantsCountByArea } from "../services/restaurants";
import defaultImage from "../assets/images/default-image.png";

// component: 음식점 데이터 목록과 상세 정보를 표시하는 컴포넌트 //
const Restaurants = () => {

    // state: 음식점 목록, 로딩 상태, 검색어, 선택된 지역, 지역 리스트, 선택된 음식점 상태 //
    const [restaurants, setRestaurants] = useState<
        { id: string; name: string; addr: string; tel: string; image: string }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [availableAreas, setAvailableAreas] = useState<{ code: string; name: string; count: number }[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // variable: 페이지당 표시할 음식점 개수 //
    const itemsPerPage = 10;

    // effect: 지역별 음식점 개수 조회 //
    useEffect(() => {
        const loadAvailableAreas = async () => {
            setLoading(true);
            try {
                const areas = await fetchRestaurantsCountByArea();
                if (areas.length > 0) {
                    setAvailableAreas(areas);
                } else {
                    console.warn("⚠️ 음식점 데이터가 있는 지역이 없습니다.");
                }
            } catch (error) {
                console.error("🚨 지역별 음식점 개수 조회 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAvailableAreas();
    }, []);

    // effect: 선택한 지역의 음식점 데이터 조회 //
    useEffect(() => {
        const loadRestaurants = async () => {
            setLoading(true);
            try {
                const data = await fetchAllRestaurants(selectedArea);
                if (!Array.isArray(data)) {
                    console.warn("⚠️ 데이터가 배열이 아닙니다. 변환 필요.");
                    return;
                }

                setRestaurants(data);
                setCurrentPage(1);
            } catch (error) {
                console.error("🚨 음식점 데이터를 불러오는 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        loadRestaurants();
    }, [selectedArea]);

    // variable: 검색어를 기반으로 음식점 필터링 //
    const filteredRestaurants = restaurants.filter(
        (restaurant) =>
            restaurant.name.includes(search) || restaurant.addr.includes(search)
    );

    // variable: 페이지네이션 관련 계산 //
    const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRestaurants = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 이동 함수
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // render: Restaurants 컴포넌트 렌더링링
    return (
        <div className="min-h-screen min-w-screen py-24 px-32 bg-white">
            
            <div className="mb-6">
                <div className="flex justify-between items-end pb-4 sm:pb-6 lg:pb-10">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#172554] font-bold text-start leading-none">음식점</div>
                    <div className="text-3xl text-[#172554] font-bold leading-none hidden md:block">Restaurants</div>
                </div>
                <hr className="border-b border-gray-300" />
            </div>

            {/* 레이아웃: 1/3 리스트 + 2/3 상세 정보 */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* 음식점 리스트 (왼쪽 1/3) */}
                <div className="md:w-1/3 bg-white p-4 rounded-3xl border-1 flex flex-col h-[100vh]">
                    <h2 className="text-xl font-semibold mb-4">음식점 리스트</h2>

                    
                    <div className="mb-4 flex flex-col-reverse gap-2">
                        <input
                            type="text"
                            placeholder="음식점 이름 또는 주소를 검색하세요."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-3 border-b w-full focus:outline-none focus:border-gray-300"
                        />

                        <select
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                            className="p-2 border rounded-2xl shadow-md w-[12vw] cursor-pointer"
                        >
                            <option value="">전체</option>
                            {availableAreas.map((area) => (
                                <option key={area.code} value={area.code}>
                                    {area.name} ({area.count})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 음식점 목록 */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <p className="text-center">로딩 중...</p>
                        ) : currentRestaurants.length > 0 ? (
                            <>
                                {currentRestaurants.map((restaurant) => (
                                    <div
                                        key={restaurant.id}
                                        onClick={() => setSelectedRestaurant(restaurant)}
                                        className={`p-3 border-b cursor-pointer hover:bg-gray-100 transition ${selectedRestaurant?.id === restaurant.id ? "bg-gray-200" : ""
                                            }`}
                                    >
                                        <h3 className="font-semibold">{restaurant.name}</h3>
                                        <p className="text-sm text-gray-600">{restaurant.addr}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
                        )}
                    </div>

                    {/* 페이지네이션 */}
                    <div className="flex justify-center items-center mt-4 gap-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &lt;
                        </button>
                        <span className="text-gray-600">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage >= totalPages}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                {/* 음식점 상세 정보 (오른쪽 2/3) */}
                <div className="md:w-2/3 bg-white rounded-3xl border-1">
                    {selectedRestaurant ? (
                        <>
                            {selectedRestaurant.image ? (
                                <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-72 object-cover rounded-t-3xl mb-4" />
                            ) : (
                                <img src={defaultImage} alt="" className="w-full h-72 bg object-center rounded-t-3xl mb-4" />
                            )}

                            <h1 className="text-3xl font-bold mb-4 pl-4">{selectedRestaurant.name}</h1>
                            <p className="text-lg text-gray-700 mb-2 pl-4">📍 <strong>주소:</strong> {selectedRestaurant.addr}</p>
                            <p className="text-lg text-gray-700 mb-2 pl-4">📞 <strong>전화:</strong> {selectedRestaurant.tel || "전화번호 없음"}</p>
                        </>
                    ) : (
                        <p className="text-center pt-16 text-gray-500">음식점을 선택하세요.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Restaurants;
