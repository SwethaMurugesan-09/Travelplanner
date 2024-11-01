import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/cities" element={<ProtectedRoute><Cities /></ProtectedRoute>} />
          <Route path="/places" element={<ProtectedRoute><Places /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/explore/:placeName" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
          <Route path="/hotels/:id" element={<ProtectedRoute><Hotels /></ProtectedRoute>} /> 
          <Route path="/restaurants/:id" element={<ProtectedRoute><Restaurants /></ProtectedRoute>} /> 
          <Route path="/tripplaces/:id" element={<ProtectedRoute><TripPlaces /></ProtectedRoute>} /> 
        </Routes>
        <Footer /> {/* Assuming Footer is visible on all pages */}
      </div>
    </Router>
  );
}

export default App;
