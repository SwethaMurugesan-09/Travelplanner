import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Places.css';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer/Footer'

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

  const city = getCityFromQuery(); // Get the city from the URL query

  useEffect(() => {
    window.scrollTo(0, 0);
    if (city) {
      // Fetch tourist places for the selected city
      axios
        .get(`http://localhost:5000/api/places/${city}`)
        .then((response) => {
          console.log("API Data:", response.data);
          setTouristPlaces(response.data);
          setFilteredPlaces(response.data);
        })
        .catch((error) => {
          console.error("Error fetching places:", error);
          setError("Failed to load tourist places");
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

  const filterPlaces = (categories, ratings) => {
    let filtered = touristPlaces;

    if (categories.length > 0) {
      filtered = filtered.filter((place) =>
        categories.includes(place.category.toLowerCase())
      );
    }

    if (ratings.length > 0) {
      filtered = filtered.filter((place) =>
        ratings.includes(Math.floor(place.ratings))
      );
    }

    setFilteredPlaces(filtered);
  };

  const handlePlaceClick = (placeName) => {
    navigate(`/explore/${placeName}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i <= rating ? '#081729' : '#ccc'}
        />
      );
    }
    return stars;
  };

  return (
    <>
    <div className='places'>
      <div className="places-total-container">
        <Navbar />
      </div>
      <div className="places-layout">
        <Sidebar filterPlaces={filterPlaces} />
        <div className="places-container">
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

                  <div className="place-infor">
                  <div className="place-info">
                    <p className="place-name">{place.placeName}</p>
                    <div className="place-ratings">{renderStars(place.ratings)}</div>
                  </div>
                  <p className="place-details">{place.details}</p>
                </div></div>
              ))}
            </div>
          ) : (
            <p>No tourist places found.</p>
          )}
        </div>
      </div>
    </div>

    <div>
      <Footer/>
    </div>
    </>
  );
};

export default Places;
