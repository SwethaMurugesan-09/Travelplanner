import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Places.css'; 

const Places = () => {
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  const getCityFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('city');
  };

  const city = getCityFromQuery();

  useEffect(() => {
    if (city) {
      axios
        .get(`/api/places/${city}`) 
        .then((response) => {
          setTouristPlaces(response.data);
        })
        .catch((error) => {
          console.error('Error fetching places:', error);
        }); 
    }
  }, [city]);

  const handlePlaceClick = (placeName) => {
    // Navigate to the explore page with the placeName as a URL parameter
    navigate(`/explore/${placeName}`); // Navigate to /explore/:placeName
  };
  
  return (
    <div className="places-container">
      <h1>Tourist Places in {city}</h1>
      {error && <p>{error}</p>}
      {touristPlaces.length > 0 ? (
        <div className="places-grid">
          {touristPlaces.map((place) => (
            <div 
              key={place._id} 
              className="place-card" 
              onClick={() => handlePlaceClick(place.placeName)} // Handle click event
            >
              <img src={place.imageUrl} alt={place.placeName} className="place-image" />
              <h3>{place.placeName}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No tourist places found.</p>
      )}
    </div>
  );
};

export default Places;
