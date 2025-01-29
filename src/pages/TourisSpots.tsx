import { useEffect, useMemo, useState } from "react";
import { fetchTouristCategories, fetchTouristSpotImages, fetchTouristSpotsByCategory } from "../services/tourisSpots";
import TouristCategory from "../components/TouristCategory";
import defaultImage from "../assets/images/default-image.png";

const TouristSpots = () => {
    const [categories, setCategories] = useState<{ name: string; code: string }[]>([]);
    const [touristSpots, setTouristSpots] = useState<{ title: string; addr1: string; tel: string; imageUrl?: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchTouristCategories();
                const items = data.response.body.items.item.map((item: any) => ({
                    name: item.name,
                    code: item.code,
                }));
                setCategories(items);
            } catch (error) {
                console.error("카테고리 로드 중 오류 발생:", error);
            }
        };
        loadCategories();
    }, []);

    const handleCategorySelect = async (code: string) => {
        setSelectedCategory(code);
        setTouristSpots([]);
        setLoading(true);
        try {
            const data = await fetchTouristSpotsByCategory(code);

            const spots = await Promise.all(
                data.response.body.items.item.map((spot: any) =>
                    fetchTouristSpotImages(spot.contentid)
                        .then((imageResponse) => ({
                            title: spot.title,
                            addr1: spot.addr1 || "N/A",
                            tel: spot.tel || "N/A",
                            imageUrl: imageResponse?.response?.body?.items?.item?.[0]?.originimgurl || defaultImage,
                        }))
                        .catch(() => ({
                            title: spot.title,
                            addr1: spot.addr1 || "N/A",
                            tel: spot.tel || "N/A",
                            imageUrl: defaultImage,
                        }))
                )
            );
            setTouristSpots(spots);
        } catch (error) {
            console.error("관광지 로드 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredSpots = useMemo(
        () =>
            touristSpots.filter(
                (spot) =>
                    spot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    spot.addr1.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [searchTerm, touristSpots]
    );

    return (
        <div className="min-h-screen min-w-screen px-8">
            <h1 className="text-3xl font-bold text-center mb-8">여행지</h1>
            <div className="flex flex-col items-center gap-4 mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="이름이나 주소를 검색하세요."
                    className="px-4 py-2 border rounded-md w-full max-w-md"
                />
                <TouristCategory
                    categories={categories}
                    onSelectCategory={handleCategorySelect}
                    selectedCategory={selectedCategory}
                />
            </div>
            {loading ? (
                <div className="text-center mt-10">로딩 중...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSpots.map((spot, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg">
                            <img src={spot.imageUrl || defaultImage} alt={spot.title} className="w-full h-40 object-cover rounded-md mb-4" />
                            <h3 className="text-lg font-bold">{spot.title}</h3>
                            <p className="text-sm text-gray-500">주소: {spot.addr1 || "N/A"}</p>
                            <p className="text-sm text-gray-500">연락처: {spot.tel || "N/A"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TouristSpots;
