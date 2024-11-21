import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar/Navbar';
import './PersonDetials.css';

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
    }
  };

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
          setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
        } else {
          const errorData = await response.json();
          alert(`Failed to cancel booking: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("An error occurred while cancelling the booking.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="person-navbar">
        <Navbar />
      </div>
      <div className="person-container">
        <h2>Your Bookings</h2>
        <div className="person-details">
          {error && <p className="error-message">{error}</p>}
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="person-booking">
                <h5> {booking.hotelName} Hotel</h5>
                <p>Booked Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>Number of Persons: {booking.numberOfPersons}</p>
                <p>Number of Days: {booking.numberOfDays}</p>
                <div className="person-details-list">
                  <h6>Persons Details</h6>
                  {booking.personsDetails.map((person, index) => (
                    <div key={index} className="person-detail-item">
                      <p>Name: {person.name}, Age: {person.age}, Food Preference: {person.foodPreference}, AC Preference: {person.acPreference}</p>
                      <button
                        className="person-remove-button"
                        onClick={() => deletePerson(booking._id, index)}
                      >
                        Remove 
                      </button>
                    </div>
                  ))}
                </div>
                <div className="person-actions">
                  <button
                    className="person-delete-button"
                    onClick={() => deleteBooking(booking._id)}
                  >
                    Cancel Entire Booking
                  </button>
                </div>

              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
