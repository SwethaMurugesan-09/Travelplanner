import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css'
function Home() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    startTravelDate: '',
    endTravelDate: '',
  });
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get('/api/countries');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error.response?.data || error.message);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchStates() {
      if (formData.country) {
        try {
          const response = await axios.get(`/api/states?country=${formData.country}`);
          setStates(response.data);
        } catch (error) {
          console.error("Error fetching states:", error.response?.data || error.message);
        }
      }
    }
    fetchStates();
  }, [formData.country]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the Cities page, passing the selected state as a query parameter
    if (formData.state) {
      navigate(`/cities?state=${formData.state}`);
    } else {
      console.error("State is not selected.");
    }
  };

  return (
    <div className="Home">
      <h1>Create Travel Plan</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Country:
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="">Select Country</option>
            {countries.length > 0 ? countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            )) : (
              <option disabled>Loading countries...</option>
            )}
          </select>
        </label>

        <label>
          State:
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            disabled={!formData.country} 
          >
            <option value="">Select State</option>
            {states.length > 0 ? states.map((state) => (
              <option key={state} value={state}>{state}</option>
            )) : (
              formData.country && <option disabled>Loading states...</option>
            )}
          </select>
        </label>

        <label>
          Start Travel Date:
          <input
            type="date"
            name="startTravelDate"
            value={formData.startTravelDate}
            onChange={handleInputChange}
            required
            min={today}
          />
        </label>

        <label>
          End Travel Date:
          <input
            type="date"
            name="endTravelDate"
            value={formData.endTravelDate}
            onChange={handleInputChange}
            required
            min={formData.startTravelDate || today}
          />
        </label>

        <button type="submit">Create Travel Plan</button>
      </form>
    </div>
  );
}

export default Home;
