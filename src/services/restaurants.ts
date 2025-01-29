
import axios from "axios";

const BASE_URL = "https://apis.data.go.kr/B551011/KorPetTourService";
const SERVICE_KEY = "avvkwqqOLS5/VGZqYPiXsFes3KznKHOgxMfNT74kQzSvIFYsmzU95vZoItf/xEesAePewx+kh6Z0usaIpUpIDA==";

// function: 음식점 데이터 가져오기 함수 //
export const fetchAllRestaurants = async (areaCode = "") => {
    try {
        const response = await axios.get(`${BASE_URL}/areaBasedList`, {
            params: {
                serviceKey: SERVICE_KEY,
                _type: "json",
                numOfRows: 100,
                pageNo: 1,
                MobileOS: "ETC",
                MobileApp: "GoFetch",
                arrange: "A",
                contentTypeId: 39, // 음식점 카테고리
                areaCode: areaCode ? areaCode : undefined,
            },
        });

        console.log("📡 API 응답 전체 데이터:", JSON.stringify(response.data, null, 2));

        let items = response.data?.response?.body?.items?.item || [];

        if (!Array.isArray(items)) {
            console.warn("⚠️ API 응답에서 items가 배열이 아님. 강제 변환 실행.");
            items = [items];
        }

        console.log("📡 API 응답 items 데이터:", items);

        return items.map((item: any) => ({
            id: item.contentid || "N/A",
            name: item.title?.trim() || "이름 없음",
            addr: item.addr1?.trim() || "주소 없음",
            tel: item.tel?.trim() || "전화번호 없음",
            image: item.firstimage || "",
            overview: item.overview?.trim() || "설명 없음",
            opentime: item.opentime?.trim() || "운영 시간 정보 없음",
            restdate: item.restdate?.trim() || "휴무일 정보 없음",
            parking: item.parking?.trim() || "주차 정보 없음",
            menu: item.menu?.trim() || "메뉴 정보 없음",
            homepage: item.homepage?.trim() || "",
            snsinsta: item.snsinsta?.trim() || "",
            snsfacebook: item.snsfacebook?.trim() || "",
            snstwitter: item.snstwitter?.trim() || "",
        }));
    } catch (error) {
        console.error("🚨 음식점 데이터 조회 중 오류 발생:", error);
        return [];
    }
};


export const fetchRestaurantsCountByArea = async () => {
    const areaCodes = [
        { code: "1", name: "서울" },
        { code: "2", name: "인천" },
        { code: "3", name: "대전" },
        { code: "4", name: "대구" },
        { code: "5", name: "광주" },
        { code: "6", name: "부산" },
        { code: "7", name: "울산" },
        { code: "8", name: "세종" },
        { code: "31", name: "경기" },
        { code: "32", name: "강원" },
        { code: "33", name: "충북" },
        { code: "34", name: "충남" },
        { code: "35", name: "전북" },
        { code: "36", name: "전남" },
        { code: "37", name: "경북" },
        { code: "38", name: "경남" },
        { code: "39", name: "제주" },
    ];

    let availableAreas = [];

    for (const area of areaCodes) {
        try {
            const response = await axios.get(`${BASE_URL}/areaBasedList`, {
                params: {
                    serviceKey: SERVICE_KEY,
                    _type: "json",
                    numOfRows: 1, // 🔥 데이터 개수 확인만 하므로 1개만 요청
                    pageNo: 1,
                    MobileOS: "ETC",
                    MobileApp: "GoFetch",
                    arrange: "A",
                    contentTypeId: 39,
                    areaCode: area.code,
                },
            });

            const totalCount = response.data?.response?.body?.totalCount || 0;
            if (totalCount > 0) {
                availableAreas.push({ code: area.code, name: area.name, count: totalCount });
            }
        } catch (error) {
            console.error(`🚨 ${area.name} 데이터 조회 실패:`, error);
        }
    }

    return availableAreas;
};