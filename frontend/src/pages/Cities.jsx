import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/Cities.css';
import Navbar from '../components/Navbar/Navbar.jsx';
 import Weather from '../components/Weather/Weather.jsx';
import Footer from '../components/Footer/Footer.jsx';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [recommendedCities, setRecommendedCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state');
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const recommendedScrollRef = useRef(null);

  useEffect(() => {
    async function fetchCities() {
       window.scrollTo(0, 0);
      if (state) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/cities?state=${state}`);
          setCities(response.data);
          setFilteredCities(response.data);
          setRecommendedCities(response.data.filter((_, i) => (i + 1) % 2 === 0));
        } catch (error) {
          console.error('Error fetching cities:', error.response?.data || error.message);
        } finally {
          setLoading(false);
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
    navigate(`/places?city=${city}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        color={i < rating ? '#FFD700' : '#ccc'}
      />
    ));
  };

  const scroll = (direction, ref) => {
    const { current } = ref;
    if (current) {
      const scrollAmount = 300;
      current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <>
    <div className="Cities">
      <Navbar />
      <div className="city-total-container">
        <h3>Best Tourist places in {state || "your selected state"}</h3>
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="city-search-input"
        />
        <div className="city-carousel">
          <button className="carousel-btn left" onClick={() => scroll('left', scrollContainerRef)}>
            <MdKeyboardArrowLeft />
          </button>
          <div className="city-container" ref={scrollContainerRef}>
            {loading ? (
              <p>Loading cities...</p>
            ) : (
              filteredCities.length > 0 ? (
                filteredCities.map((cityData) => (
                  <div
                    key={cityData.city}
                    className="city-card"
                    onClick={() => handleCityClick(cityData.city)}
                  >
                    <img
                      src={cityData.imageUrl}
                      alt={cityData.city}
                      className="city-image"
                    />
                    <div className="city-header">
                      <h2>{cityData.city}</h2>
                      <div className="city-ratings">{renderStars(cityData.ratings)}</div>
                    </div>
                    <p className="city-para">{cityData.notes}</p>
                  </div>
                ))
              ) : (
                <p>No cities found</p>
              )
            )}
          </div>
          <button className="carousel-btn right" onClick={() => scroll('right', scrollContainerRef)}>
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>

      {/* Recommended Places Section */}
      <div className="city-total-container1">
        <h3>Recommended Places</h3>
        <div className="city-carousel">
          <button className="carousel-btn left" onClick={() => scroll('left', recommendedScrollRef)}>
            <MdKeyboardArrowLeft />
          </button>
          <div className="city-container" ref={recommendedScrollRef}>
            {loading ? (
              <p>Loading recommended cities...</p>
            ) : (
              recommendedCities.length > 0 ? (
                recommendedCities.map((cityData) => (
                  <div
                    key={cityData.city}
                    className="city-card"
                    onClick={() => handleCityClick(cityData.city)}
                  >
                    <img
                      src={cityData.imageUrl}
                      alt={cityData.city}
                      className="city-image"
                    />
                    <div className="city-header">
                      <h2>{cityData.city}</h2>
                      <div className="city-ratings">{renderStars(cityData.ratings)}</div>
                    </div>
                    <p className="city-para">{cityData.notes}</p>
                  </div>
                ))
              ) : (
                <p>No recommended cities found</p>
              )
            )}
          </div>
          <button className="carousel-btn right" onClick={() => scroll('right', recommendedScrollRef)}>
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>

<div className="weather-container">
  <h2>Weather Forecasting</h2>
  <Weather city={state} days={7} />
</div>

    </div>

    <div>
      <Footer/>
    </div>
    </>
  );
};

export default Cities;

