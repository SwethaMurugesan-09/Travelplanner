import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Places from './pages/Places';
import Home from './pages/Home';
import Cities from './pages/Cities';
import Login from './pages/Login';
import Explore from './pages/Explore';
import Hotels from './pages/Hotels';
import Restaurants from './pages/Restaurants';
import TripPlaces from './pages/TripPlaces';
import Favourites from './components/Favourites/Favourites';
import About from './components/About/About';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';
import Packages from './pages/Packages';
import Profile from './pages/Profile';
import HotelBookingForm from './components/Booking/Booking';
import PersonDetials from './components/PersonDetials/PersonDetials';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/places" element={<Places />} />
        <Route path="/explore/:placeName" element={<Explore />} />
        <Route path="/hotels/:id" element={<Hotels />} />
        <Route path="/restaurants/:id" element={<Restaurants />} />
        <Route path="/tripplaces/:id" element={<TripPlaces />} />
        <Route path="/packages/:id" element={<Packages />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/favourites" element={<Favourites />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/booking' element={<HotelBookingForm/>}/>
          <Route path='/personDetials' element={<PersonDetials/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
