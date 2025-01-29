import { useLocation } from "react-router-dom";

const RestaurantDetail = () => {
    const location = useLocation();
    const restaurant = location.state;

    if (!restaurant) return <p className="text-center">음식점 정보를 찾을 수 없습니다.</p>;

    return (
        <div className="min-h-screen min-w-screen p-8 bg-gray-100">
            <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                {/* 음식점 이미지 */}
                {restaurant.image ? (
                    <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-64 object-cover rounded-md mb-4"
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-md mb-4">
                        <p className="text-gray-600">이미지가 없습니다.</p>
                    </div>
                )}

                <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>

                {/* 기본 정보 */}
                <p className="text-lg text-gray-700 mb-2">📍 <strong>주소:</strong> {restaurant.addr}</p>
                <p className="text-lg text-gray-700 mb-2">📞 <strong>전화:</strong> {restaurant.tel}</p>

                {/* 운영 정보 */}
                {restaurant.opentime && (
                    <p className="text-lg text-gray-700 mb-2">⏰ <strong>영업시간:</strong> {restaurant.opentime}</p>
                )}
                {restaurant.restdate && (
                    <p className="text-lg text-gray-700 mb-2">📅 <strong>휴무일:</strong> {restaurant.restdate}</p>
                )}

                {/* 주차 정보 */}
                {restaurant.parking && (
                    <p className="text-lg text-gray-700 mb-2">🅿️ <strong>주차 가능:</strong> {restaurant.parking}</p>
                )}

                {/* 메뉴 정보 */}
                {restaurant.menu && (
                    <p className="text-lg text-gray-700 mb-2">🍽️ <strong>대표 메뉴:</strong> {restaurant.menu}</p>
                )}

                {/* 홈페이지 링크 */}
                {restaurant.homepage && (
                    <p className="text-lg text-blue-600 mb-2">
                        🌐 <a href={restaurant.homepage} target="_blank" rel="noopener noreferrer">공식 웹사이트</a>
                    </p>
                )}

                {/* SNS 정보 */}
                <div className="flex gap-4 mt-4">
                    {restaurant.snsinsta && (
                        <a href={restaurant.snsinsta} target="_blank" rel="noopener noreferrer" className="text-pink-500">
                            📸 Instagram
                        </a>
                    )}
                    {restaurant.snsfacebook && (
                        <a href={restaurant.snsfacebook} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                            👍 Facebook
                        </a>
                    )}
                    {restaurant.snstwitter && (
                        <a href={restaurant.snstwitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                            🐦 Twitter
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail;
