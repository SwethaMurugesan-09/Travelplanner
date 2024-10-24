import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TripPlaces = () => {
  const { id } = useParams(); // Get trip place ID from URL
  const [tripPlace, setTripPlace] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/tripplaces/${id}`) // Fetch trip place details by ID
      .then((response) => {
        setTripPlace(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trip place:', error);
        setError('Failed to fetch trip place details.');
      });
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!tripPlace) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{tripPlace.name}</h2>
      <img src={tripPlace.imageUrl} alt={tripPlace.name} />
      <p>Details: {tripPlace.details}</p>
    </div>
  );
};

export default TripPlaces;
