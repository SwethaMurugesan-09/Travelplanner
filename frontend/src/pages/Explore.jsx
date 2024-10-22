import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Explore.css';

const Explore = () => {
  const { placeName } = useParams(); // Get the placeName from URL params
  const [specificPlace, setSpecificPlace] = useState(null); // State for specific place data
  const [error, setError] = useState(null); // State for error handling

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

  // Handle the case where placeName is an object
  const displayPlaceName = typeof specificPlace.placeName === 'object' 
    ? specificPlace.placeName.placeName 
    : specificPlace.placeName;

  return (
    <div className="explore-container">
      <h3>Details for {displayPlaceName}</h3>

      {/* Display the main place image */}
      {specificPlace.imageUrl && (
        <img src={specificPlace.imageUrl} alt={displayPlaceName} className="place-image" />
      )}

      {/* Render Hotels Section */}
      <h2>Hotels:</h2>
      {specificPlace.hotels && specificPlace.hotels.length > 0 ? (
        specificPlace.hotels.map((hotel, index) => (
          <div key={index} className="item-card">
            <img src={hotel.imageUrl} alt={hotel.name} className="item-image" />
            <p><strong>{hotel.name}</strong></p>
            <p>Ratings: {hotel.ratings} / 5</p>
          </div>
        ))
      ) : (
        <p>No hotels available</p>
      )}

      {/* Render Trip Places Section */}
      <h2>Trip Places:</h2>
      {specificPlace.tripplaces && specificPlace.tripplaces.length > 0 ? (
        specificPlace.tripplaces.map((tripplace, index) => (
          <div key={index} className="item-card">
            <img src={tripplace.imageUrl} alt={tripplace.name} className="item-image" />
            <p><strong>{tripplace.name}</strong></p>
            <p>Ratings: {tripplace.ratings} / 5</p>
          </div>
        ))
      ) : (
        <p>No trip places available</p>
      )}

      {/* Render Restaurants Section */}
      <h2>Restaurants:</h2>
      {specificPlace.restaurant && specificPlace.restaurant.length > 0 ? (
        specificPlace.restaurant.map((rest, index) => (
          <div key={index} className="item-card">
            <img src={rest.imageUrl} alt={rest.name} className="item-image" />
            <p><strong>{rest.name}</strong></p>
            <p>Ratings: {rest.ratings} / 5</p>
          </div>
        ))
      ) : (
        <p>No restaurants available</p>
      )}
    </div>
  );
};

export default Explore;
