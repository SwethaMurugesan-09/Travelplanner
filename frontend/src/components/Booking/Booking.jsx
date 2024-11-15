import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import HotelBookingForm from './HotelBooking';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, isAuthenticated } = useAuth();

  const { hotelId } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const hotelIdFromQuery = queryParams.get('hotelId');
  const hotel = hotelId || hotelIdFromQuery;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  if (!hotel) {
    return <p>Error: No hotel ID provided.</p>;
  }

  if (!email) {
    return <p>Loading user information...</p>; // Temporary state until email is fetched
  }

  return (
    <div>
      <h1>Hotel Booking</h1>
      <HotelBookingForm hotelId={hotel} email={email} />
    </div>
  );
};

export default Booking;
