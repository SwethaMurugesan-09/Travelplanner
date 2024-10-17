import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Places from './pages/Places';
import Home from './pages/Home';
import Cities from './pages/Cities';
import Login from './pages/Login';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cities" element={<Cities/>}/>
          <Route path="/places" element={<Places/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
