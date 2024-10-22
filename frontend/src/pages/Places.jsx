import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Places.css'; 
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

const Places = () => {
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); 

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
          setFilteredPlaces(response.data);
        })
        .catch((error) => {
          console.error('Error fetching places:', error);
          setError('Failed to load tourist places');
        });
    }
  }, [city]);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = touristPlaces.filter((place) =>
      place.placeName.toLowerCase().includes(searchValue)
    );
    setFilteredPlaces(filtered);
  };

  const handlePlaceClick = (placeName) => {
    navigate(`/explore/${placeName}`);
  };

  return (
    <div>
    <div className='places-total-container'>
      <Navbar /> </div>
      <div className="places-layout"> {/* Flex container */}
        <Sidebar /> {/* Sidebar on the left */}
        <div className="places-container"> {/* Places content on the right */}
          <h1>Tourist Places in {city}</h1>
          <input
            type="text"
            placeholder="Search for a place..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="places-search-input"
          />
          {error && <p>{error}</p>}
          {filteredPlaces.length > 0 ? (
            <div className="places-grid">
              {filteredPlaces.map((place) => (
                <div 
                  key={place._id} 
                  className="place-card" 
                  onClick={() => handlePlaceClick(place.placeName)}
                >
                  <img src={place.imageUrl} alt={place.placeName} className="place-image" />
                  <p>{place.placeName}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No tourist places found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Places;
