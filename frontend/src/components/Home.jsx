import React, { useState, useEffect } from 'react';
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
    notes: ''
  });

  // Fetch countries on component mount
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get('/api/countries');
        console.log('Countries fetched:', response.data);  // Debugging line
        setCountries(response.data);  // Ensure it's an array
      } catch (error) {
        console.error('Error fetching countries:', error.response?.data || error.message);
      }
    }
    fetchCountries();
  }, []);

  // Fetch states when the country changes
  useEffect(() => {
    async function fetchStates() {
      if (formData.country) {
        try {
          const response = await axios.get(`/api/states?country=${formData.country}`);
          console.log(`States fetched for ${formData.country}:`, response.data); // Debugging line
          setStates(response.data);  // Ensure it's an array
        } catch (error) {
          console.error("Error fetching states:", error.response?.data || error.message);
        }
      }
    }
    fetchStates();
  }, [formData.country]);

  // Fetch cities when the state changes
  useEffect(() => {
    async function fetchCities() {
      if (formData.state) {
        try {
          const response = await axios.get(`/api/cities?state=${formData.state}`);
          console.log(`Cities fetched for ${formData.state}:`, response.data); // Debugging line
          setCities(response.data);  // Ensure it's an array
        } catch (error) {
          console.error("Error fetching cities:", error.response?.data || error.message);
        }
      }
    }
    fetchCities();
  }, [formData.state]);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log('Form data updated:', { ...formData, [e.target.name]: e.target.value });  // Debugging line
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);  // Debugging line
    try {
      const response = await axios.post('/api/travelplans', formData);
      alert('Travel Plan created successfully!');
      console.log('Travel Plan creation response:', response.data);  // Debugging line
    } catch (error) {
      console.error('Error creating travel plan:', error.response?.data || error.message);
    }
  };

  // Rendering logic
  return (
    <div className="Home">
      <h1>Create Travel Plan</h1>
      <form onSubmit={handleSubmit}>
        {/* Country Dropdown */}
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

        {/* State Dropdown */}
        <label>
          State:
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            disabled={!formData.country}  // Only enabled when a country is selected
          >
            <option value="">Select State</option>
            {states.length > 0 ? states.map((state) => (
              <option key={state} value={state}>{state}</option>
            )) : (
              formData.country && <option disabled>Loading states...</option>
            )}
          </select>
        </label>

        {/* City Dropdown */}
        <label>
          City:
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            disabled={!formData.state}  // Only enabled when a state is selected
          >
            <option value="">Select City</option>
            {cities.length > 0 ? cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            )) : (
              formData.state && <option disabled>Loading cities...</option>
            )}
          </select>
        </label>

        {/* Start Travel Date */}
        <label>
          Start Travel Date:
          <input
            type="date"
            name="startTravelDate"
            value={formData.startTravelDate}
            onChange={handleInputChange}
            required
          />
        </label>

        {/* End Travel Date */}
        <label>
          End Travel Date:
          <input
            type="date"
            name="endTravelDate"
            value={formData.endTravelDate}
            onChange={handleInputChange}
            required
          />
        </label>

        {/* Notes */}
        <label>
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          ></textarea>
        </label>

        <button type="submit">Create Travel Plan</button>
      </form>
    </div>
  );
}

export default Home;
