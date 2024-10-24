import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Restaurants = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/specificplace/restaurants/${id}`); // Fetch restaurant by ID
        setRestaurant(response.data);
      } catch (error) {
        setError('Failed to fetch restaurant details.');
      }
    };

    fetchRestaurant();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <img src={restaurant.imageUrl} alt={restaurant.name} />
      <p>Ratings: {restaurant.ratings}</p>
      <p>Details: {restaurant.details}</p>
    </div>
  );
};

export default Restaurants;
