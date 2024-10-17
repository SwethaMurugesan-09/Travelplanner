import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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
        .get(`/api/touristplaces?city=${city}`)  // Ensure this matches the backend route
        .then((response) => {
          setTouristPlaces(response.data);
        })
        .catch((error) => {
          console.error('Error fetching places:', error);
          setError('Could not fetch tourist places.');
        });
    }
  }, [city]);

  return (
    <div>
      <h1>Tourist Places in {city}</h1>
      {error && <p>{error}</p>}
      {touristPlaces.length > 0 ? (
        <ul>
          {touristPlaces.map((place) => (
            <li key={place._id}>{place.touristPlace}</li>
          ))}
        </ul>
      ) : (
        <p>No tourist places found.</p>
      )}
    </div>
  );
};

export default Places;

