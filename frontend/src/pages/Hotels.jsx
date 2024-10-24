import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Hotels = () => {
  const { id } = useParams(); // Get the hotel ID from the URL
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/specificplace/hotels/${id}`); // Fetch hotel by ID
        setHotel(response.data);
      } catch (error) {
        setError('Failed to fetch hotel details.');
      }
    };

    fetchHotel();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!hotel) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{hotel.name}</h2>
      <img src={hotel.imageUrl} alt={hotel.name} />
      <p>Ratings: {hotel.ratings}</p>
      <p>Details: {hotel.details}</p>
      <p>Amount: {hotel.amount}</p>
    </div>
  );
};

export default Hotels;
