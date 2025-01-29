import axios from "axios";

const BASE_URL = "https://openapi.gg.go.kr/Animalhosptl";
const SERVICE_KEY = "494a806b65024b58a9ea2fce36f33f84";

// function: 병원 데이터 가져오기 함수 //
export const fetchHospitals = async (pageIndex: number = 1, pageSize: number = 10, cancelToken: any) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                KEY: SERVICE_KEY,
                Type: "json",
                pIndex: pageIndex,
                pSize: pageSize,
            },
            cancelToken, // 요청 취소를 위해 추가
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log("요청이 취소되었습니다:", error.message);
        } else {
            console.error("병원 데이터 조회 중 오류 발생:", error);
        }
        throw error;
    }
};
