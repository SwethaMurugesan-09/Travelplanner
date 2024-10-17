import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    city: '',
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

  useEffect(() => {
    async function fetchCities() {
      if (formData.state) {
        try {
          const response = await axios.get(`/api/cities?state=${formData.state}`);
          setCities(response.data);
        } catch (error) {
          console.error("Error fetching cities:", error.response?.data || error.message);
        }
      }
    }
    fetchCities();
  }, [formData.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.city) {
      // Navigate to the Places page with the selected city
      navigate(`/places?city=${formData.city}`);
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
          City:
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            disabled={!formData.state} 
          >
            <option value="">Select City</option>
            {cities.length > 0 ? cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            )) : (
              formData.state && <option disabled>Loading cities...</option>
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
