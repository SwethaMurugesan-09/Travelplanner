import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Restaurants = () => {
  const { id } = useParams(); // Get restaurant ID from URL
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/restaurants/${id}`); // Use full backend URL
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant:', error.response ? error.response.data : error.message);
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
      <p>Details: {restaurant.details}</p>
      <p>Ratings: {restaurant.ratings}</p>
    </div>
  );
};

export default Restaurants;
