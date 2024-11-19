import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const PersonDetails = () => {
  const { email } = useAuth();
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
  }, [email]);

  // Function to delete a specific person from a booking
  const deletePerson = async (bookingId, personIndex) => {
    const userConfirmation = window.confirm("Are you sure you want to remove this person from the booking?");

    if (userConfirmation) {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/person/${personIndex}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert("Person removed from booking successfully!");
          // Refresh bookings after deletion
          setBookings(prevBookings => 
            prevBookings.map(booking => 
              booking._id === bookingId
                ? { ...booking, personsDetails: booking.personsDetails.filter((_, index) => index !== personIndex) }
                : booking
            )
          );
        } else {
          const errorData = await response.json();
          alert(`Failed to remove person: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error removing person from booking:", error);
        alert("An error occurred while removing the person from the booking.");
      }
    } else {
      alert("Person removal cancelled.");
    }
  };

  // Function to delete the entire booking
  const deleteBooking = async (bookingId) => {
    const userConfirmation = window.confirm("Are you sure you want to cancel the entire booking?");

    if (userConfirmation) {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert("Booking cancelled successfully!");
          // Refresh bookings after deletion
          setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
        } else {
          const errorData = await response.json();
          alert(`Failed to cancel booking: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("An error occurred while cancelling the booking.");
      }
    } else {
      alert("Booking cancellation cancelled.");
    }
  };

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
              <h3>Hotel: {booking.hotelName}</h3>
              <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p>Number of Persons: {booking.numberOfPersons}</p>
              <p>Number of Days: {booking.numberOfDays}</p>
              <p>Persons Details:</p>
              <ul>
                {booking.personsDetails.map((person, index) => (
                  <li key={index}>
                    Age: {person.age}, Food Preference: {person.foodPreference}, AC Preference: {person.acPreference}
                    <button onClick={() => deletePerson(booking._id, index)}>Remove Person</button>
                  </li>
                ))}
              </ul>
              <button onClick={() => deleteBooking(booking._id)}>Cancel Entire Booking</button>
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
