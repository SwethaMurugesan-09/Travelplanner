import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../styles/Cities.css';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state');
  const navigate = useNavigate(); // Hook to navigate to Places page

  useEffect(() => {
    async function fetchCities() {
      if (state) {
        try {
          const response = await axios.get(`/api/cities?state=${state}`);
          setCities(response.data);
        } catch (error) {
          console.error('Error fetching cities:', error.response?.data || error.message);
        }
      }
    }

    fetchCities();
  }, [state]);

  // Function to handle city click
  const handleCityClick = (city) => {
    navigate(`/places?city=${city}`); // Navigate to the Places page with the city as a query parameter
  };

  return (
    <div className="Cities">
      <h3>Best Tourist places in {state}</h3>
      <div className="city-container">
        {cities.length > 0 ? (
          cities.map((cityData) => (
            <div
              key={cityData.city}
              className="city-card"
              onClick={() => handleCityClick(cityData.city)} // Attach the click handler to each city card
            >
              <img
                src={cityData.imageUrl}
                alt={cityData.city}
                className="city-image"
              />
              <h2>{cityData.city}</h2>
            </div>
          ))
        ) : (
          state && <p>Loading cities...</p>
        )}
      </div>
    </div>
  );
};

export default Cities;
