import React from "react";

// interface: TouristSpot //
interface TouristSpot {
    title: string;
    addr1: string;
    tel: string;
}

// interface: TouristListProps //
interface TouristListProps {
    spots: TouristSpot[];
}

// component: 관광지 목록 표시 리스트 컴포넌트 //
const TouristList: React.FC<TouristListProps> = ({ spots }) => {

    // render: TouristList 컴포넌트 렌더링 //
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map((spot, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg">
                    <h3 className="text-lg font-bold">{spot.title}</h3>
                    <p className="text-sm text-gray-500">주소: {spot.addr1 || "N/A"}</p>
                    <p className="text-sm text-gray-500">연락처: {spot.tel || "N/A"}</p>
                </div>
            ))}
        </div>
    );
};

export default TouristList;
