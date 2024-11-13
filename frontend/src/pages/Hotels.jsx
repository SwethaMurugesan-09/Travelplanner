import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Hotels.css';
import Navbar from '../components/Navbar/Navbar';
import CurrencyConverter from '../components/CurrencyConverter/CurrencyConverter';

const Hotels = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/specificplace/hotels/${id}`);
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
      <Navbar />
      <h2>{hotel.name}</h2>
      <div className="hotels-container">
        <div className="hotels-container-flex">
          {hotel.imageUrl && hotel.imageUrl.length > 0 && (
            <Carousel 
              showThumbs={true} 
              showArrows={false} 
              autoPlay 
              interval={2000} 
              infiniteLoop 
              showStatus={false} 
              dynamicHeight={true}
            >
              {hotel.imageUrl.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Hotel ${index}`} className="hotels-img" />
                </div>
              ))}
            </Carousel>
          )}
          <div className="hotel-details">
            <p><span>Ratings:</span> {hotel.ratings}</p>
            <p><span>Details:</span> {hotel.details}</p>
            <p><span>Amount:</span> ₹{hotel.amount}</p>
            <button>Book Now</button>
          </div>
        </div>
        <div className="hotels-currency">
          <CurrencyConverter />
        </div>

      </div>
    </div>
  );
};

export default Hotels;
