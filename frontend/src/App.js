import React, { useEffect, useState } from 'react';
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
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/cities" element={<Cities/>}/>
          <Route path="/places" element={<Places/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/explore/:placeName" element={<Explore />} />
          <Route path="/hotels/:id" element={<Hotels/>} /> 
          <Route path="/restaurants/:id" element={<Restaurants />} /> 
          <Route path="/tripplaces/:id" element={<TripPlaces />} /> 
          </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
