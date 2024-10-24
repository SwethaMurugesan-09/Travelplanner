import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Hotels = () => {
  const { id } = useParams(); // Get hotel ID from URL
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`); // Ensure the URL is correct
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel:', error.response ? error.response.data : error.message);
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
      <p>Details: {hotel.details}</p>
      <p>Ratings: {hotel.ratings}</p>
    </div>
  );
};

export default Hotels;
