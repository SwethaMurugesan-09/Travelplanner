import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Hotels.css'
import Navbar from '../components/Navbar/Navbar';

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
    <div className="hotels-total-container">
      <Navbar/>
    <div className='hotels-container'>
      <h2>{hotel.name}</h2>
      <img src={hotel.imageUrl} alt={hotel.name} className='hotels-img'/>
      <p>Ratings: {hotel.ratings}</p>
      <p>Details: {hotel.details}</p>
      <p>Amount: {hotel.amount}</p>
    </div></div>
  );
};

export default Hotels;
