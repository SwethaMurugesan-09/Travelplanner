import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel'; // Import the carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import '../styles/TripPlaces.css'; // Your custom styles
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
      <Navbar />
      <div className="tripplaces-container">
        <h2>{tripPlace.name}</h2>

        {/* Carousel for trip place images */}
        {tripPlace.imageUrl && tripPlace.imageUrl.length > 0 && (
          <Carousel showThumbs={false} dynamicHeight={true} infiniteLoop={true}>
            {tripPlace.imageUrl.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Trip Place ${index}`} className="tripplaces-img" />
              </div>
            ))}
          </Carousel>
        )}

        <p>Details: {tripPlace.details}</p>
      </div>
    </div>
  );
};

export default TripPlaces;
