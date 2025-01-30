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
        <div className="min-h-screen min-w-screen py-24 px-32 bg-gray-100">
            <div className="flex justify-between items-end pb-4 sm:pb-6 lg:pb-10 pt-14">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#172554] font-bold text-start leading-none">여행지</div>
                <div className="text-3xl text-[#172554] font-bold leading-none hidden md:block">TourisSpots</div>
            </div>
            <hr className="border-b border-gray-300 mb-6" />

            <div className="flex flex-col items-center gap-4 mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="이름이나 주소를 검색하세요."
                    className="px-4 py-2 border-b w-full max-w-md focus:outline-none focus:border-gray-300"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                    {filteredSpots.map((spot, index) => (
                        <div key={index} className="bg-white rounded-2xl pt-4 flex flex-col">
                        <h3 className="text-lg font-bold px-6 pb-2">{spot.title}</h3>
                        <p className="text-sm text-gray-500 px-6">주소: {spot.addr1 || "N/A"}</p>
                        <p className="text-sm text-gray-500 px-6 pb-8">연락처: {spot.tel || "N/A"}</p>
                        
                        <div className="flex-grow">
                            <img 
                                src={spot.imageUrl || defaultImage} 
                                alt={spot.title} 
                                className="w-full h-full object-cover rounded-b-2xl"
                            />
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TouristSpots;
