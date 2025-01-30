import { Link } from "react-router-dom";
import {
    HOSPITAL_SPOTS_PATH,
    RESTAURANT_SPOTS_PATH,
    ROOT_PATH,
    TOURIST_SPOTS_PATH
} from "../constants";
import logo from "../assets/images/foot-logo.png";

const Footer = () => {
    return (
        <footer className="bg-[#101F42] text-gray-400">
            <div className="max-w-7xl mx-auto px-14 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 로고 & 소개 */}
                <div className="flex flex-col items-center md:items-start">
                    <img src={logo} alt="GoFetch Logo" className="h-12 mb-3" />
                    <p className="text-sm text-gray-400">
                        반려동물과 함께하는 여행 & 라이프 서비스
                    </p>
                </div>

                {/* 내비게이션 */}
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="text-lg font-semibold mb-2">바로가기</h4>
                    <Link to={ROOT_PATH} className="text-sm hover:text-gray-300">메인</Link>
                    <Link to={TOURIST_SPOTS_PATH} className="text-sm hover:text-gray-300">여행지</Link>
                    <Link to={HOSPITAL_SPOTS_PATH} className="text-sm hover:text-gray-300">병원</Link>
                    <Link to={RESTAURANT_SPOTS_PATH} className="text-sm hover:text-gray-300">음식점</Link>
                </div>

                {/* 회사 정보 */}
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="text-lg font-semibold mb-2">회사 정보</h4>
                    <p className="text-sm">고펫치 (GoFetch!)</p>
                    <p className="text-sm">Email: contact@gofetch.com</p>
                    <p className="text-sm">사업자 등록번호: 123-45-67890</p>
                </div>
            </div>

            {/* Copyright & 추가 링크 */}
            <div className="border-t border-gray-300 py-4 text-center text-sm">
                &copy; {new Date().getFullYear()} GoFetch! All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
