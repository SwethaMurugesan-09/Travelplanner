import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import image1 from '../components/travel_assets/image1.jpg';
import Navbar from '../components/travel_assets/Navbar/Navbar';

function Home() {
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    state: '',
    startTravelDate: '',
    endTravelDate: '',
  });
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await axios.get(`/api/states`);
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error.response?.data || error.message);
      }
    }
    fetchStates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.state) {
      navigate(`/cities?state=${formData.state}`);
    } else {
      console.error("State is not selected.");
    }
  };

  return (
    <>
    <div className="Home-container">
         <Navbar />
      <div className="form-image-container">
        <img src={image1} alt="Travel" className="background-image" />

        <form onSubmit={handleSubmit} className="form-overlay">
          <label>
            State:
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            >
              <option value="">Select State</option>
              {states.length > 0 ? states.map((state) => (
                <option key={state} value={state}>{state}</option>
              )) : (
                <option disabled>Loading states...</option>
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

          <button type="submit">Start Journey</button>
        </form>
      </div>

      <div className="famous-places">
        <h3>Recommended Places</h3>
        
      </div>
    </div>
    </>
  );
}

export default Home;
