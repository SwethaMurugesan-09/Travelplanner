import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Explore.css';
import Navbar from '../components/Navbar/Navbar';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer/Footer';
const Explore = () => {
  const { placeName } = useParams();
  const [specificPlace, setSpecificPlace] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({
    hotels: false,
    restaurants: false,
    tripplaces: false,
  });
  const [selectedRatings, setSelectedRatings] = useState({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  });

  useEffect(() => {
    const fetchSpecificPlace = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/specificplace/explore/${placeName}`);
        setSpecificPlace(response.data);
      } catch (error) {
        console.error('Error fetching specific place:', error.response ? error.response.data : error.message);
        setError('Failed to fetch specific place details.');
      }
    };

    fetchSpecificPlace();
  }, [placeName]);

  const scrollHorizontally = (id, scrollOffset) => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollLeft += scrollOffset;
    }
  };

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
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i <= rating ? '#FFD700' : '#ccc'}
        />
      );
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

  const isRatingFilterApplied = Object.values(selectedRatings).some(val => val);
  const isCategoryFilterApplied = Object.values(selectedCategories).some(val => val);

  const filteredHotels = isRatingFilterApplied
    ? specificPlace.hotels?.filter(hotel => selectedRatings[hotel.ratings])
    : specificPlace.hotels;

  const filteredRestaurants = isRatingFilterApplied
    ? specificPlace.restaurant?.filter(rest => selectedRatings[rest.ratings])
    : specificPlace.restaurant;

  const filteredTripPlaces = specificPlace.tripplaces;

  const displayHotels = isCategoryFilterApplied ? selectedCategories.hotels : true;
  const displayRestaurants = isCategoryFilterApplied ? selectedCategories.restaurants : true;
  const displayTripPlaces = isCategoryFilterApplied ? selectedCategories.tripplaces : true;

  return (
    <>
    <div className="explore-total-container">
      <Navbar />
      <div className="explore-container">
      <div className="explore-sidebar">
  <h3>Categories</h3>
  <div>
    <input type="checkbox" id="hotels" checked={selectedCategories.hotels} onChange={() => handleCategoryChange('hotels')} />
    <label htmlFor="hotels">Hotels</label>
  </div>
  <div>
    <input type="checkbox" id="restaurants" checked={selectedCategories.restaurants} onChange={() => handleCategoryChange('restaurants')} />
    <label htmlFor="restaurants">Restaurants</label>
  </div>
  <div>
    <input type="checkbox" id="tripplaces" checked={selectedCategories.tripplaces} onChange={() => handleCategoryChange('tripplaces')} />
    <label htmlFor="tripplaces">Trip Places</label>
  </div>

  <h3>Filter by Ratings</h3>
  {[5, 4, 3, 2, 1].map((rating) => (
    <div key={rating}>
      <input type="checkbox" id={`rating-${rating}`} checked={selectedRatings[rating]} onChange={() => handleRatingChange(rating)} />
      <label htmlFor={`rating-${rating}`}>{`${rating} stars`}</label>
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
              <div className="explore-main-hotels-container">
              <MdOutlineKeyboardDoubleArrowLeft className="scroll-button left" onClick={() => scrollHorizontally('hotels-container', -300)} />
                <div id="hotels-container" className="explore-main-hotels">
                  {filteredHotels && filteredHotels.length > 0 ? (
                    filteredHotels.map((hotel, index) => (
                      <div key={index} className="explore-item-card">
                        <Link to={`/hotels/${hotel._id}`}>
                          <img src={hotel.imageUrl[0]} alt={hotel.name} className="explore-item-image" />
                        </Link>
                        <h5 className='explore-hotel-name'><strong>{hotel.name}</strong></h5>
                        <div className="explore-info">
                        <p>&#8377;{hotel.amount}</p>
                        <p>{renderStars(hotel.ratings)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No hotels available</p>
                  )}
                </div>
                <MdOutlineKeyboardDoubleArrowRight className="scroll-button right" onClick={() => scrollHorizontally('hotels-container', 300)} />
              </div>
            </>
          )}

          {displayRestaurants && (
            <>
              <h2>Restaurants:</h2>
              <div className="explore-main-hotels-container">
                <MdOutlineKeyboardDoubleArrowLeft className="scroll-button left" onClick={() => scrollHorizontally('restaurants-container', -300)} />
                <div id="restaurants-container" className="explore-main-hotels">
                  {filteredRestaurants && filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant, index) => (
                      <div key={index} className="explore-item-card">
                        <Link to={`/restaurants/${restaurant._id}`}>
                          <img src={restaurant.imageUrl[0]} alt={restaurant.name} className="explore-item-image" />
                        </Link>
                        <h5 className='explore-hotel-name'><strong>{restaurant.name}</strong></h5>
                        <div className="explore-info">
                        <p>₹{restaurant.amount}</p>
                             <p> {renderStars(restaurant.ratings)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No restaurants available</p>
                  )}
                </div>
                <MdOutlineKeyboardDoubleArrowRight className="scroll-button right" onClick={() => scrollHorizontally('restaurants-container', 300)} />
              </div>
            </>
          )}

          {displayTripPlaces && (
            <>
              <h2>Trip Places:</h2>
              <div className="explore-main-hotels-container">
                <MdOutlineKeyboardDoubleArrowLeft className="scroll-button left" onClick={() => scrollHorizontally('tripplaces-container', -300)} />
                <div id="tripplaces-container" className="explore-main-hotels">
                  {filteredTripPlaces && filteredTripPlaces.length > 0 ? (
                    filteredTripPlaces.map((tripplace, index) => (
                      <div key={index} className="explore-item-card">
                        <Link to={`/tripplaces/${tripplace._id}`}>
                          <img src={tripplace.imageUrl[0]} alt={tripplace.name} className="explore-item-image" />
                        </Link>
                        <h5 className='explore-trip-name'><strong>{tripplace.name}</strong></h5>
                      </div>
                    ))
                  ) : (
                    <p>No trip places available</p>
                  )}
                </div>
                <MdOutlineKeyboardDoubleArrowRight className="scroll-button right" onClick={() => scrollHorizontally('tripplaces-container', 300)} />
              </div>
            </>
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

export default Explore;
