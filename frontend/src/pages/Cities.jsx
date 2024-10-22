import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/Cities.css';
import Navbar from '../components/Navbar/Navbar.jsx';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]); // State for filtered cities
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state');
  const navigate = useNavigate(); // Hook to navigate to Places page

  useEffect(() => {
    async function fetchCities() {
      if (state) {
        try {
          const response = await axios.get(`/api/cities?state=${state}`);
          setCities(response.data);
          setFilteredCities(response.data); // Initially, all cities are shown
        } catch (error) {
          console.error('Error fetching cities:', error.response?.data || error.message);
        }
      }
    }

    fetchCities();
  }, [state]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = cities.filter(cityData =>
      cityData.city.toLowerCase().includes(value)
    );
    setFilteredCities(filtered);
  };

  const handleCityClick = (city) => {
    navigate(`/places?city=${city}`); // Navigate to the Places page with the city as a query parameter
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i <= rating ? '#FFD700' : '#ccc'} // Gold for filled stars, gray for empty
        />
      );
    }
    return stars;
  };

  return (
    <div className="Cities">
      <Navbar />
      <h3>Best Tourist places in {state}</h3>
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="city-search-input"
      />
      <div className="city-container">
        {filteredCities.length > 0 ? (
          filteredCities.map((cityData) => (
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
              <div className="city-header">
                <h2>{cityData.city}</h2>
                <div className="city-ratings">{renderStars(cityData.ratings)}</div> {/* Render stars based on rating */}
              </div>
              <p className='city-para'>{cityData.notes}</p>
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
