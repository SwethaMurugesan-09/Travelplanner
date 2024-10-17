import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Places.css'; 
const Places = () => {
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

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
  
  

  return (
    <div className="places-container">
      <h1>Tourist Places in {city}</h1>
      {error && <p>{error}</p>}
      {touristPlaces.length > 0 ? (
        <div className="places-grid">
          {touristPlaces.map((place) => (
            <div key={place._id} className="place-card">
              <img src={place.imageUrl} alt={place.touristPlace} className="place-image" />
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
