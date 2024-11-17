import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 

const PersonDetails = () => {
  const { email } = useAuth(); // Access the email from AuthContext
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!email) {
        setError('Email not found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/bookings?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          if (data.bookings && data.bookings.length > 0) {
            setBookings(data.bookings);
          } else {
            setError('No bookings found');
          }
        } else {
          setError(data.message || 'Error fetching bookings');
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError('An error occurred while fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [email]); // Include email as a dependency to refetch if it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Bookings</h2>
      {error && <p>{error}</p>}
      
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
    <h3>Hotel: {booking.hotelId?.name || 'Hotel Name Not Available'}</h3>
    <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p>Number of Persons: {booking.numberOfPersons}</p>
              <p>Number of Days: {booking.numberOfDays}</p>
              <p>Persons Details:</p>
              <ul>
                {booking.personsDetails.map((person, index) => (
                  <li key={index}>
                    Age: {person.age}, Food Preference: {person.foodPreference}, AC Preference: {person.acPreference}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default PersonDetails;
