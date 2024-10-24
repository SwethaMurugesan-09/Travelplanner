import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/TripPlaces.css'
import Navbar from '../components/Navbar/Navbar';
const TripPlaces = () => {
  const { id } = useParams(); // Get the trip place ID from the URL
  const [tripPlace, setTripPlace] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripPlace = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/specificplace/tripplaces/${id}`); // Fetch trip place by ID
        setTripPlace(response.data);
      } catch (error) {
        setError('Failed to fetch trip place details.');
      }
    };

    fetchTripPlace();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!tripPlace) {
    return <p>Loading...</p>;
  }

  return (
    <div className="tripplaces-total-container">
      <Navbar/>
    <div className='tripplaces-container'>
      <h2>{tripPlace.name}</h2>
      <img src={tripPlace.imageUrl} alt={tripPlace.name} className='tripplaces-img'/>
      <p>Details: {tripPlace.details}</p>
    </div></div>
  );
};

export default TripPlaces;
