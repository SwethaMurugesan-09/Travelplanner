import React, { useState } from 'react';

const HotelBookingForm = ({ hotelId }) => {
    const [numberOfPersons, setNumberOfPersons] = useState(1);
    const [personsDetails, setPersonsDetails] = useState([{ age: '', foodPreference: 'Veg', acPreference: 'AC' }]);
    const [numberOfDays, setNumberOfDays] = useState(1);
    const [bookingDate, setBookingDate] = useState('');
    const [message, setMessage] = useState('');

    const handlePersonDetailChange = (index, field, value) => {
        const updatedDetails = [...personsDetails];
        updatedDetails[index][field] = value;
        setPersonsDetails(updatedDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email, 
            hotelId,
            numberOfPersons,
            numberOfDays,
            personsDetails,
            bookingDate,
        };

        console.log('Form Data being sent to backend:', formData);

        try {
            const response = await fetch('http://localhost:5000/api/book-hotel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                setMessage('Booking successful!');
            } else {
                setMessage(data.message || 'Error during booking');
            }
        } catch (error) {
            setMessage('An error occurred while booking');
        }
    };

    const handleNumberOfPersonsChange = (e) => {
        const numPersons = e.target.value;
        setNumberOfPersons(numPersons);
        const newPersonsDetails = Array.from({ length: numPersons }, () => ({
            age: '',
            foodPreference: 'Veg',
            acPreference: 'AC'
        }));
        setPersonsDetails(newPersonsDetails);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book Hotel</h2>
            
            <label>
                Booking Date:
                <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
            </label>

            <label>
                Number of Persons:
                <input
                    type="number"
                    value={numberOfPersons}
                    onChange={handleNumberOfPersonsChange}
                    min="1"
                />
            </label>

            {personsDetails.map((person, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                    <h3>Person {index + 1} Details</h3>
                    
                    <label>
                        Age:
                        <input
                            type="number"
                            value={person.age}
                            onChange={(e) => handlePersonDetailChange(index, 'age', e.target.value)}
                            min="1"
                        />
                    </label>

                    <label>
                        Food Preference:
                        <select
                            value={person.foodPreference}
                            onChange={(e) => handlePersonDetailChange(index, 'foodPreference', e.target.value)}
                        >
                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>
                        </select>
                    </label>

                    <label>
                        AC Preference:
                        <select
                            value={person.acPreference}
                            onChange={(e) => handlePersonDetailChange(index, 'acPreference', e.target.value)}
                        >
                            <option value="AC">AC</option>
                            <option value="Non-AC">Non-AC</option>
                        </select>
                    </label>
                </div>
            ))}

            <label>
                Number of Days:
                <input
                    type="number"
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(e.target.value)}
                    min="1"
                />
            </label>

            <button type="submit">Book Now</button>
            <p>{message}</p>
        </form>
    );
};

export default HotelBookingForm;
