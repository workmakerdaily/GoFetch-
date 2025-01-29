import { Link } from 'react-router-dom';
import mainVideo from '../assets/videos/main-video.mp4';
import gallery1 from '../assets/images/gallery1.jpg';
import gallery2 from '../assets/images/gallery2.jpg';
import gallery3 from '../assets/images/gallery3.jpg';
import gallery4 from '../assets/images/gallery4.webp';
import gallery5 from '../assets/images/gallery5.jpg';
import gallery6 from '../assets/images/gallery6.jpg';
import { FaPaw, FaUtensils, FaHospital } from 'react-icons/fa';
import { HOSPITAL_SPOTS_PATH, RESTAURANT_SPOTS_PATH, TOURIST_SPOTS_PATH } from '../constants';

const Home = () => {
    return (
        <main className="min-h-screen min-w-screen bg-gray-100">
            {/* 1 */}
            <section className="relative h-[80vh] w-full flex items-center justify-start px-8 lg:px-16">

                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    autoPlay
                >
                    <source src={mainVideo} type="video/mp4" />
                </video>

                <div className="relative z-10 w-full max-w-lg text-left text-white">
                    <h1 className="text-4xl font-bold leading-tight drop-shadow-lg">
                        반려동물과의 외출을 <br /> 더 쉽고 편리하게
                    </h1>
                    <p className="mt-4 text-lg drop-shadow-md">
                        여행지, 음식점, 병원까지 한 번에! <br />
                        지금 바로 GoFetch!에서 찾아보세요.
                    </p>
                </div>
                <div className="absolute inset-0 bg-black/40"></div>
            </section>

            {/* 2 */}
            <section className="bg-gradient-to-r from-[#E8EAF6] to-[#C5CAE9] py-20 text-center">
                <div className="max-w-5xl mx-auto px-6">
                    {/* 아이콘과 제목 */}
                    <div className="flex flex-col items-center">
                        <FaPaw className="text-5xl text-[#3949AB] mb-4" />
                        <h2 className="text-4xl font-bold text-gray-900">
                            그동안 따로 찾아보느라 힘드셨죠?
                        </h2>
                    </div>

                    {/* 본문 텍스트 */}
                    <p className="mt-6 text-lg text-gray-800 leading-relaxed">
                        반려동물과 함께할 수 있는
                        <span className="font-bold text-[#3949AB]"> 여행지, 맛집, 동물병원</span>을
                        검색하는 일이 얼마나 번거로웠는지 잘 알고 있습니다.<br />
                        <span className="italic text-gray-700"> "애견 동반 가능"</span>이라고 적혀 있어도
                        막상 방문하면 반려동물 출입이 불가능한 경우도 많았죠.
                    </p>

                    <p className="mt-4 text-lg text-gray-800 leading-relaxed">
                        <span className="font-bold">GoFetch!</span>는 이러한 불편함을 해결하기 위해
                        <span className="font-bold text-[#3949AB]"> 신뢰할 수 있는 반려동물 동반 장소 정보</span>만을 모았습니다.<br />
                        이제 더 이상 여러 사이트를 전전하지 않아도 돼요!
                        한눈에 정보를 확인하고, 안심하고 떠나세요. 🐾
                    </p>

                    {/* 데코 요소 */}
                    <div className="mt-8 flex justify-center gap-4">
                        <div className="w-12 h-1 bg-[#3949AB] rounded-full"></div>
                        <div className="w-12 h-1 bg-[#FF6B6B] rounded-full"></div>
                        <div className="w-12 h-1 bg-[#F5A623] rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* 3 */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">GoFetch!에서는 무엇을 할 수 있나요?</h2>
                    <p className="mt-2 text-gray-600">반려동물과 함께하는 최고의 장소를 찾아보세요!</p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <FaPaw className="text-4xl text-[#3949AB] mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold">반려동물 여행지 검색</h3>
                            <p className="mt-2 text-gray-600">반려동물과 함께 갈 수 있는 여행지를 찾아보세요.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <FaUtensils className="text-4xl text-[#FF6B6B] mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold">애견 동반 음식점</h3>
                            <p className="mt-2 text-gray-600">반려동물과 함께 식사할 수 있는 레스토랑을 쉽게 검색하세요.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <FaHospital className="text-4xl text-[#F5A623] mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold">동물병원</h3>
                            <p className="mt-2 text-gray-600">긴급한 상황을 대비해 가까운 동물병원을 찾아보세요.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4 */}
            <section className="py-16 bg-[#ffffff]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    {/* 섹션 제목 */}
                    <h2 className="text-3xl font-bold text-gray-900">
                        GoFetch!와 함께 <br className="hidden sm:block" /> 더 다양한 순간을 즐기세요
                    </h2>
                    <p className="mt-2 text-gray-600">
                        우리의 소중한 반려동물과 함께하는 <br className="hidden sm:block" />
                        특별한 순간을 만들어 보세요.
                    </p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                        <div className="relative overflow-hidden rounded-lg shadow-md">
                            <img src={gallery1} alt="" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" />
                            <div className="absolute bottom-0 left-0 bg-black/50 text-white text-sm px-4 py-2">
                                반려견과 함께 떠나는 여행
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg shadow-md">
                            <img src={gallery2} alt="" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" />
                            <div className="absolute bottom-0 left-0 bg-black/50 text-white text-sm px-4 py-2">
                                애견 동반 레스토랑에서 특별한 식사
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg shadow-md">
                            <img src={gallery3} alt="동물 병원 방문" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" />
                            <div className="absolute bottom-0 left-0 bg-black/50 text-white text-sm px-4 py-2">
                                건강한 삶을 위한 동물 병원 방문
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg shadow-md">
                            <img src={gallery4} alt="반려동물과 캠핑" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" />
                            <div className="absolute bottom-0 left-0 bg-black/50 text-white text-sm px-4 py-2">
                                캠핑장에서 함께하는 특별한 밤
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg shadow-md">
                            <img src={gallery5} alt="반려견과 해변 산책" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" />
                            <div className="absolute bottom-0 left-0 bg-black/50 text-white text-sm px-4 py-2">
                                반려견과 함께하는 해변 산책
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg shadow-md">
                            <img src={gallery6} alt="반려동물과 드라이브" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" />
                            <div className="absolute bottom-0 left-0 bg-black/50 text-white text-sm px-4 py-2">
                                반려동물과 떠나는 즐거운 드라이브
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 5 */}
            <section className="bg-[#3949AB] py-16 text-center text-white">
                <h2 className="text-3xl font-bold">반려동물과의 완벽한 외출을 준비하세요!</h2>
                <p className="mt-2 text-lg">여행지, 음식점, 병원 검색을 지금 바로 시작해보세요.</p>

                <div className="mt-8 flex justify-center gap-6">
                    <Link to={TOURIST_SPOTS_PATH} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <FaPaw className="text-4xl text-[#3949AB]" />
                        <span className="mt-2 text-black font-semibold">여행지</span>
                    </Link>

                    <Link to={RESTAURANT_SPOTS_PATH} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <FaUtensils className="text-4xl text-[#FF6B6B]" />
                        <span className="mt-2 text-black font-semibold">음식점</span>
                    </Link>

                    <Link to={HOSPITAL_SPOTS_PATH} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                        <FaHospital className="text-4xl text-[#F5A623]" />
                        <span className="mt-2 text-black font-semibold">병원</span>
                    </Link>
                </div>
            </section>

        </main>
    );
};

export default Home;
