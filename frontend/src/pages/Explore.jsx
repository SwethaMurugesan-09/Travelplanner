import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Explore.css'
const Explore = () => {
  const { placeName } = useParams(); // Get placeName from URL
  const [specificPlace, setSpecificPlace] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch details for the specific place based on placeName
    axios
      .get(`/api/specificplace/explore/${placeName}`) // Adjust the endpoint as necessary
      .then((response) => {
        setSpecificPlace(response.data); // Expecting data about the specific place
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

  // Assuming `placeName` is an object, you should extract the appropriate field (like `placeName.name` or `placeName.placeName`)
  const displayPlaceName = typeof specificPlace.placeName === 'object' ? specificPlace.placeName.placeName : specificPlace.placeName;

  return (
    <div className="explore-container">
      <h3>Details for {displayPlaceName}</h3>
      <img src={specificPlace.imageUrl} alt={displayPlaceName} className="place-image" />
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
