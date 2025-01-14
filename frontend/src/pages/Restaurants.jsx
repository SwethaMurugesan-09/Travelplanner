import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel'; // Import the carousel component
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import '../styles/Restaurants.css'; // Import your custom styles
import Navbar from '../components/Navbar/Navbar';
import CurrencyConverter from '../components/CurrencyConverter/CurrencyConverter';
import Footer from '../components/Footer/Footer';

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
    <div className="restaurants-total-container">
      <Navbar />
      <h2>{restaurant.name}</h2>

      <div className="restaurants-container">
        <div className="restaurants-container-flex">
          {restaurant.imageUrl && restaurant.imageUrl.length > 0 && (
            <Carousel
              showThumbs={false} // Disable thumbnail previews
              showArrows={false}
              autoPlay
              interval={2000}
              infiniteLoop
              showStatus={false}
              dynamicHeight={true}
            >
              {restaurant.imageUrl.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Restaurant ${index}`} className="restaurants-img" />
                </div>
              ))}
            </Carousel>
          )}
          <div className="restaurants-details">
            <div className="restaurants-details-flex">
              <div>
                <p>
                  <span>Amount:</span> ₹{restaurant.amount}
                </p>
              </div>
              <div>
                <p>
                  <span>Ratings:</span> {restaurant.ratings}
                </p>
              </div>
            </div>
            <p>
              <span>Details:</span> {restaurant.details}
            </p>
          </div>
        </div>
        <div className="restaurants-currency">
          <CurrencyConverter />
        </div>
      </div>
      
    </div><div>
        <Footer/>
      </div></div>
  );
};

export default Restaurants;
