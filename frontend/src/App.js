import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Places from './components/pages/Places';
import Home from './components/Home';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/places" element={<Places/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
