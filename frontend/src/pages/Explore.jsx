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
  }); 
  const [selectedRatings, setSelectedRatings] = useState({
    5: true,
    4: true,
    3: true,
    2: true,
    1: true,
  });

  useEffect(() => {
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

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) => ({
      ...prev,
      [rating]: !prev[rating],
    }));
  };

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

  const placeNameString = typeof specificPlace?.placeName === 'object' 
    ? specificPlace?.placeName?.placeName || 'Unknown Place' 
    : specificPlace?.placeName || 'Unknown Place';

  if (error) {
    return <p>{error}</p>;
  }

  if (!specificPlace) {
    return <p>Loading...</p>; 
  }

  // Check if any rating checkboxes are selected (at least one is true)
  const isRatingFilterApplied = Object.values(selectedRatings).some(val => val);

  // Check if any category checkboxes are selected (at least one is true)
  const isCategoryFilterApplied = Object.values(selectedCategories).some(val => val);

  // Filter hotels based on selected ratings, or show all if no ratings are selected
  const filteredHotels = isRatingFilterApplied
    ? specificPlace.hotels?.filter(hotel => selectedRatings[hotel.ratings])
    : specificPlace.hotels;

  // Filter restaurants based on selected ratings, or show all if no ratings are selected
  const filteredRestaurants = isRatingFilterApplied
    ? specificPlace.restaurant?.filter(rest => selectedRatings[rest.ratings])
    : specificPlace.restaurant;

  // Trip Places should always show, no filtering by ratings
  const filteredTripPlaces = specificPlace.tripplaces;

  // Only display categories if at least one checkbox is selected, otherwise show all
  const displayHotels = isCategoryFilterApplied ? selectedCategories.hotels : true;
  const displayRestaurants = isCategoryFilterApplied ? selectedCategories.restaurants : true;
  const displayTripPlaces = isCategoryFilterApplied ? selectedCategories.tripplaces : true;

  return (
    <div className="explore-total-container">
      <Navbar />
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

          <h3>Filter by Ratings</h3>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating}>
              <input
                type="checkbox"
                id={`rating-${rating}`}
                checked={selectedRatings[rating]}
                onChange={() => handleRatingChange(rating)}
              />
              <label htmlFor={`rating-${rating}`}>{renderStars(rating)}</label>
            </div>
          ))}
        </div>

        <div className="explore-main-content">
          <h3>Details for {placeNameString}</h3>

          {specificPlace.imageUrl && (
            <img src={specificPlace.imageUrl} alt={placeNameString} className="explore-place-image" />
          )}

          {displayHotels && (
            <>
              <h2>Hotels:</h2>
              <div className="explore-main-hotels">
                {filteredHotels && filteredHotels.length > 0 ? (
                  filteredHotels.map((hotel, index) => (
                    <div key={index} className="explore-item-card">
                      <img src={hotel.imageUrl} alt={hotel.name} className="explore-item-image" />
                      <p><strong>{hotel.name}</strong></p>
                      <p>Ratings: {renderStars(hotel.ratings)}</p>
                    </div>
                  ))
                ) : (
                  <p>No hotels available</p>
                )}
              </div>
            </>
          )}

          {displayRestaurants && (
            <>
              <h2>Restaurants:</h2>
              <div className="explore-main-hotels">
                {filteredRestaurants && filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((rest, index) => (
                    <div key={index} className="explore-item-card">
                      <img src={rest.imageUrl} alt={rest.name} className="explore-item-image" />
                      <p><strong>{rest.name}</strong></p>
                      <p>Ratings: {renderStars(rest.ratings)}</p>
                    </div>
                  ))
                ) : (
                  <p>No restaurants available</p>
                )}
              </div>
            </>
          )}

          {displayTripPlaces && (
            <>
              <h2>Trip Places:</h2>
              <div className="explore-main-hotels">
                {filteredTripPlaces && filteredTripPlaces.length > 0 ? (
                  filteredTripPlaces.map((tripplace, index) => (
                    <div key={index} className="explore-item-card">
                      <img src={tripplace.imageUrl} alt={tripplace.name} className="explore-item-image" />
                      <p><strong>{tripplace.name}</strong></p>
                    </div>
                  ))
                ) : (
                  <p>No trip places available</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
