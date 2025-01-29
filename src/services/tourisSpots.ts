import axios from "axios";

const BASE_URL = "https://apis.data.go.kr/B551011/KorPetTourService";
const SERVICE_KEY = "avvkwqqOLS5/VGZqYPiXsFes3KznKHOgxMfNT74kQzSvIFYsmzU95vZoItf/xEesAePewx+kh6Z0usaIpUpIDA=="; // 실제 서비스 키로 교체

// function: 여행지 카테고리 가져오기 함수 //
export const fetchTouristCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categoryCode`, {
        params: {
            serviceKey: SERVICE_KEY,
            numOfRows: 10,
            pageNo: 1,
            MobileOS: "ETC",
            MobileApp: "GoFetch",
            _type: "json",
        },
    });
    return response.data;
};

// function: 여행지 카테고리별 리스트 가져오기 함수 //
export const fetchTouristSpotsByCategory = async (categoryCode: string) => {
    const response = await axios.get(`${BASE_URL}/areaBasedList`, {
        params: {
            serviceKey: SERVICE_KEY,
            cat1: categoryCode,
            numOfRows: 10,
            pageNo: 1,
            MobileOS: "ETC",
            MobileApp: "GoFetch",
            _type: "json",
        },
    });
    return response.data;
};

// function: 여행지 장소별 이미지 가져오기 함수 //
export const fetchTouristSpotImages = async (contentId: string) => {
    const response = await axios.get(`${BASE_URL}/detailImage`, {
        params: {
            serviceKey: SERVICE_KEY,
            contentId: contentId, // 특정 여행지의 ID
            imageYN: "Y",
            MobileOS: "ETC",
            MobileApp: "GoFetch",
            _type: "json",
        },
    });
    return response.data;
};