import React from 'react';
import { useLocation } from 'react-router-dom';
import HotelBookingForm from './HotelBooking';

const Booking = () => {
  const location = useLocation();

  const { hotelId } = location.state || {};  

  const queryParams = new URLSearchParams(location.search);
  const hotelIdFromQuery = queryParams.get('hotelId');

  // Use hotelId from either state or query params, whichever is available
  const hotel = hotelId || hotelIdFromQuery;

  if (!hotel) {
    return <p>Error: No hotel ID provided.</p>;
  }

  return (
    <div>
      <h1>Hotel Booking</h1>
      <HotelBookingForm hotelId={hotel} />
    </div>
  );
};

export default Booking;
