// variable: path 상수 //
export const ROOT_PATH = '/';

export const TOURIST_SPOTS_PATH = '/touristSpots';
export const HOSPITAL_SPOTS_PATH = '/hospitals';
export const RESTAURANT_SPOTS_PATH = '/restaurants';
export const RESTAURANT_DETAIL_SPOTS_PATH = (id: string | number) => `/restaurants/${id}`;
