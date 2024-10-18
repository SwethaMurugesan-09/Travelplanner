import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Explore = () => {
  const { placeName } = useParams(); // Get placeName from URL
  const [specificPlace, setSpecificPlace] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post(`/api/specificplace/explore/${placeName}`) // Adjust the endpoint as necessary
      .then((response) => {
        setSpecificPlace(response.data);
      })
      .catch((error) => {
        console.error('Error fetching specific place:', error);
        setError('Failed to fetch specific place details.');
      });
  }, [placeName]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!specificPlace) {
    return <p>Loading...</p>; // Or a loading spinner
  }

  return (
    <div className="explore-container">
      <h1>Details for {specificPlace.placeName}</h1>
      <img src={specificPlace.imageUrl} alt={specificPlace.placeName} className="place-image" />
      <h2>Hotels:</h2>
      <p>{specificPlace.hotels}</p>
      <h2>Trip Places:</h2>
      <p>{specificPlace.tripplaces}</p>
      <h2>Restaurants:</h2>
      <p>{specificPlace.restaurant}</p>
    </div>
  );
};

export default Explore;
