import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Explore.css';
import Navbar from '../components/Navbar/Navbar';

const Explore = () => {
  const { placeName } = useParams(); // Get the placeName from URL params
  const [specificPlace, setSpecificPlace] = useState(null); // State for specific place data
  const [error, setError] = useState(null); // State for error handling
  const [selectedCategories, setSelectedCategories] = useState({
    hotels: true,
    restaurants: true,
    tripplaces: true,
  }); // State for selected categories

  useEffect(() => {
    // Fetch specific place details from the backend
    axios
      .get(`/api/specificplace/explore/${placeName}`)
      .then((response) => {
        setSpecificPlace(response.data); // Set the response data to specificPlace state
      })
      .catch((error) => {
        console.error('Error fetching specific place:', error);
        setError('Failed to fetch specific place details.'); // Handle error
      });
  }, [placeName]);

  if (error) {
    return <p>{error}</p>; // Render error if any
  }

  if (!specificPlace) {
    return <p>Loading...</p>; // Render loading state if data is not yet available
  }

  // Handle checkbox changes
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i}>&#9733;</span>); // Filled star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Empty star
      }
    }
    return stars;
  };

  // Safely access specificPlace properties and avoid rendering objects
  const placeNameString = typeof specificPlace.placeName === 'object' 
    ? specificPlace.placeName?.placeName || 'Unknown Place' 
    : specificPlace.placeName || 'Unknown Place';

  return (
    <div className="explore-total-container">
      <Navbar/>
    <div className="explore-container">
      <div className="explore-sidebar">
        <h3>Categories</h3>
        <div>
          <input
            type="checkbox"
            id="hotels"
            checked={selectedCategories.hotels}
            onChange={() => handleCategoryChange('hotels')}
          />
          <label htmlFor="hotels">Hotels</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="restaurants"
            checked={selectedCategories.restaurants}
            onChange={() => handleCategoryChange('restaurants')}
          />
          <label htmlFor="restaurants">Restaurants</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="tripplaces"
            checked={selectedCategories.tripplaces}
            onChange={() => handleCategoryChange('tripplaces')}
          />
          <label htmlFor="tripplaces">Trip Places</label>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h3>Details for {placeNameString}</h3>

        {/* Display the main place image */}
        {specificPlace.imageUrl && (
          <img src={specificPlace.imageUrl} alt={placeNameString} className="place-image" />
        )}

        {/* Render Hotels Section */}
        {selectedCategories.hotels && (
          <>
            <h2>Hotels:</h2>
            {specificPlace.hotels && Array.isArray(specificPlace.hotels) && specificPlace.hotels.length > 0 ? (
              specificPlace.hotels.map((hotel, index) => (
                <div key={index} className="item-card">
                  <img src={hotel.imageUrl} alt={hotel.name} className="item-image" />
                  <p><strong>{hotel.name}</strong></p>
                  <p>Ratings: {renderStars(hotel.ratings)}</p>
                </div>
              ))
            ) : (
              <p>No hotels available</p>
            )}
          </>
        )}

        {/* Render Restaurants Section */}
        {selectedCategories.restaurants && (
          <>
            <h2>Restaurants:</h2>
            {specificPlace.restaurant && Array.isArray(specificPlace.restaurant) && specificPlace.restaurant.length > 0 ? (
              specificPlace.restaurant.map((rest, index) => (
                <div key={index} className="item-card">
                  <img src={rest.imageUrl} alt={rest.name} className="item-image" />
                  <p><strong>{rest.name}</strong></p>
                  <p>Ratings: {renderStars(rest.ratings)}</p>
                </div>
              ))
            ) : (
              <p>No restaurants available</p>
            )}
          </>
        )}

        {/* Render Trip Places Section */}
        {selectedCategories.tripplaces && (
          <>
            <h2>Trip Places:</h2>
            {specificPlace.tripplaces && Array.isArray(specificPlace.tripplaces) && specificPlace.tripplaces.length > 0 ? (
              specificPlace.tripplaces.map((tripplace, index) => (
                <div key={index} className="item-card">
                  <img src={tripplace.imageUrl} alt={tripplace.name} className="item-image" />
                  <p><strong>{tripplace.name}</strong></p>
                  <p>Ratings: {renderStars(tripplace.ratings)}</p>
                </div>
              ))
            ) : (
              <p>No trip places available</p>
            )}
          </>
        )}
      </div>
    </div></div>
  );
};

export default Explore;
