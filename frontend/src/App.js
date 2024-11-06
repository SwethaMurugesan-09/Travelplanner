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
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<div style={{ minHeight: '80vh' }}><Home /></div>} />
          <Route path="/contact" element={<div style={{ minHeight: '80vh' }}><Contact /></div>} />
          <Route path="/cities" element={<div style={{ minHeight: '80vh' }}><Cities /></div>} />
          <Route path="/places" element={<div style={{ minHeight: '80vh' }}><Places /></div>} />
          <Route path="/about" element={<div style={{ minHeight: '80vh' }}><About /></div>} />
          <Route path="/explore/:placeName" element={<div style={{ minHeight: '80vh' }}><Explore /></div>} />
          <Route path="/hotels/:id" element={<div style={{ minHeight: '80vh' }}><Hotels /></div>} />
          <Route path="/restaurants/:id" element={<div style={{ minHeight: '80vh' }}><Restaurants /></div>} />
          <Route path="/tripplaces/:id" element={<div style={{ minHeight: '80vh' }}><TripPlaces /></div>} />
        </Route>
      </Routes>
      {location.pathname !== '/' && <Footer />}
    </>
  );
};

export default App;
