import { useEffect, useState } from "react";
import { fetchAllRestaurants, fetchRestaurantsCountByArea } from "../services/restaurants";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<
        { id: string; name: string; addr: string; tel: string; image: string }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedArea, setSelectedArea] = useState(""); // 🔥 선택된 지역 코드
    const [availableAreas, setAvailableAreas] = useState<{ code: string; name: string; count: number }[]>([]); // 🔥 음식점이 있는 지역만 저장
    const navigate = useNavigate();

    // function: 지역별 음식점 개수 불러오기
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

    // function: 선택된 지역의 음식점 불러오기
    useEffect(() => {
        const loadRestaurants = async () => {
            setLoading(true);
            try {
                const data = await fetchAllRestaurants(selectedArea);
                console.log("✅ 최종 음식점 리스트:", data);

                if (!Array.isArray(data)) {
                    console.warn("⚠️ 데이터가 배열이 아닙니다. 변환 필요.");
                    return;
                }

                setRestaurants(data);
            } catch (error) {
                console.error("🚨 음식점 데이터를 불러오는 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        loadRestaurants();
    }, [selectedArea]); // 🔥 selectedArea 변경 시 데이터 다시 로드

    // 검색 필터링
    const filteredRestaurants = restaurants.filter(
        (restaurant) =>
            restaurant.name.includes(search) || restaurant.addr.includes(search)
    );

    return (
        <div className="min-h-screen min-w-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-6">음식점 목록</h1>

            {/* 🔥 지역 선택 드롭다운 & 검색창을 가로 정렬 */}
            <div className="mb-4 flex flex-wrap justify-center gap-4">
                <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="p-3 border rounded-md shadow-md w-[200px]"
                >
                    <option value="">전체</option>
                    {availableAreas.map((area) => (
                        <option key={area.code} value={area.code}>
                            {area.name} ({area.count})
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="음식점 이름 또는 주소 검색..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-3 border rounded-md shadow-md flex-1 min-w-[250px]"
                />
            </div>

            {/* 음식점 리스트 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">음식점 리스트</h2>
                {loading ? (
                    <p className="text-center">로딩 중...</p>
                ) : filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            onClick={() => navigate(`/restaurants/${restaurant.id}`, { state: restaurant })}
                            className="p-3 border-b cursor-pointer hover:bg-gray-200 transition"
                        >
                            <h3 className="font-semibold">{restaurant.name}</h3>
                            <p className="text-sm text-gray-600">{restaurant.addr}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default Restaurants;
