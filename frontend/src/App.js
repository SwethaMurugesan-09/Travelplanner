// App.js
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
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';
import GoogleMapEmbed from './components/GoogleApi/GoogleMap';
import Packages from './pages/Packages';

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
        {/* Public routes */}
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
        <Route path="/google" element={<GoogleMapEmbed />} />

        {/* Protected route for Contact */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>

      {/* Render the Footer if the current path is not "/" */}
      {location.pathname !== '/' && <Footer />}
    </>
  );
};

export default App;
