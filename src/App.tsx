import './App.css'
import "./index.css"
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';
import TouristSpots from './pages/TourisSpots';
import { ROOT_PATH, TOURIST_SPOTS_PATH, HOSPITAL_SPOTS_PATH, RESTAURANT_SPOTS_PATH, RESTAURANT_DETAIL_SPOTS_PATH } from './constants';
import Hospitals from './pages/Hospitals';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import Footer from './components/Footer';


const App = () => {

  return (
    <div className='min-h-screen w-full overflow-x-hidden'>
      <NavigationBar />

      <Routes>
        <Route path={ROOT_PATH} element={<Home />} />
        <Route path={TOURIST_SPOTS_PATH} element={<TouristSpots />} />
        <Route path={HOSPITAL_SPOTS_PATH} element={<Hospitals />} />
        <Route path={RESTAURANT_SPOTS_PATH} element={<Restaurants />} />
        <Route path={RESTAURANT_DETAIL_SPOTS_PATH(":id")} element={<RestaurantDetail />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App;
