import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Cities.css';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state'); 

  useEffect(() => {
    async function fetchCities() {
      if (state) { 
        try {
          const response = await axios.get(`/api/cities?state=${state}`);
          setCities(response.data);
        } catch (error) {
          console.error("Error fetching cities:", error.response?.data || error.message);
        }
      }
    }

    fetchCities();
  }, [state]);

  return (
    <div className="Cities">
      <h1>Available Cities in {state}</h1>
      <div className="city-container">
        {cities.length > 0 ? cities.map((cityData) => (
          <div key={cityData.city} className="city-card">
            <img 
              src={cityData.imageUrl} 
              alt={cityData.city} 
              className="city-image"
            />
            <h2>{cityData.city}</h2>
          </div>
        )) : (
          state && <p>Loading cities...</p>
        )}
      </div>
    </div>
  );
};

export default Cities;
