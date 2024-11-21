import React, { useState } from 'react';
import './HotelBooking.css';
import Navbar from '../Navbar/Navbar';

const HotelBookingForm = ({ hotelId, email }) => {
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [personsDetails, setPersonsDetails] = useState([{ age: '', foodPreference: 'Veg', acPreference: 'AC' }]);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [bookingDate, setBookingDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingDate || numberOfPersons < 1 || numberOfDays < 1) {
      setMessage('Please fill all the required fields.');
      return;
    }

    const isValidFoodPreference = personsDetails.every(person =>
      ['Veg', 'Non-Veg'].includes(person.foodPreference)
    );
    if (!isValidFoodPreference) {
      setMessage('Invalid or missing food preference for one or more persons');
      return;
    }

    const formData = {
      email,
      hotelId,
      numberOfPersons,
      numberOfDays,
      personsDetails,
      bookingDate,
    };

    try {
      const response = await fetch('http://localhost:5000/api/book-hotel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.message === 'Booking successful') {
        setMessage('Booking successful!');
      } else {
        setMessage(data.message || 'Error during booking');
      }
    } catch (error) {
      setMessage('An error occurred while booking');
    }
  };

  const handleNumberOfPersonsChange = (e) => {
    const numPersons = parseInt(e.target.value, 10);
    setNumberOfPersons(numPersons);

    const newPersonsDetails = Array.from({ length: numPersons }, () => ({
      age: '',
      foodPreference: 'Veg',
      acPreference: 'AC',
    }));
    setPersonsDetails(newPersonsDetails);
  };

  const handlePersonDetailChange = (index, field, value) => {
    const updatedDetails = [...personsDetails];
    if (field === 'age' && value !== '' && (isNaN(value) || value <= 0)) {
      return;
    }
    updatedDetails[index][field] = field === 'age' ? parseInt(value, 10) : value;
    setPersonsDetails(updatedDetails);
  };

  return (
    <div className="hotelbooking-main">
      <div className="hotelbooking-navbar">
        <Navbar />
      </div>

      <div className="hotelbooking-container">
  <form onSubmit={handleSubmit} className="hotelbooking-form">
    <h2 className="hotelbooking-title">Book the Hotel</h2>
    <label className="hotelbooking-label">
      Booking Date:
      <input
        type="date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        className="hotelbooking-input"
      />
    </label>
    <label className="hotelbooking-label">
      Number of Persons:
      <input
        type="number"
        value={numberOfPersons}
        onChange={handleNumberOfPersonsChange}
        min="1"
        className="hotelbooking-input"
      />
    </label>
    {personsDetails.map((person, index) => (
      <div key={index} className="hotelbooking-person-details">
        <h3 className="hotelbooking-person-title">Person {index + 1} Details</h3>
        <label className="hotelbooking-label">
          Name:
          <input
            type="text"
            value={person.name}
            onChange={(e) => handlePersonDetailChange(index, 'name', e.target.value)}
            className="hotelbooking-input"
          />
        </label>
        <label className="hotelbooking-label">
          Age:
          <input
            type="number"
            value={person.age}
            onChange={(e) => handlePersonDetailChange(index, 'age', e.target.value)}
            min="1"
            className="hotelbooking-input"
          />
        </label>
        <label className="hotelbooking-label">
          Food Preference:
          <select
            value={person.foodPreference}
            onChange={(e) => handlePersonDetailChange(index, 'foodPreference', e.target.value)}
            className="hotelbooking-input"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </label>
        <label className="hotelbooking-label">
          AC Preference:
          <select
            value={person.acPreference}
            onChange={(e) => handlePersonDetailChange(index, 'acPreference', e.target.value)}
            className="hotelbooking-input"
          >
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
        </label>
      </div>
    ))}
    <label className="hotelbooking-label">
      Number of Days:
      <input
        type="number"
        value={numberOfDays}
        onChange={(e) => setNumberOfDays(e.target.value)}
        min="1"
        className="hotelbooking-input"
      />
    </label>
    <button type="submit" className="hotelbooking-button">Book Now</button>
    <p className="hotelbooking-message">{message}</p>
  </form>
</div>


    </div>
  );
};

export default HotelBookingForm;
