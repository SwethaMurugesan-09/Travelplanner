import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/Home.css';
import image1 from '../components/travel_assets/image1.jpg'; // Replace with appropriate image if needed
import Navbar from '../components/Navbar/Navbar';

function Home() {
  const [states, setStates] = useState([]);
  const [randomStates, setRandomStates] = useState([]);
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
        const response = await axios.get(`http://localhost:5000/api/states`);
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error.response?.data || error.message);
      }
    }

    async function fetchRandomStates() {
      try {
        const response = await axios.get(`http://localhost:5000/api/randomstates`);
        const sortedStates = response.data.sort((a, b) => b.ratings - a.ratings);
        setRandomStates(sortedStates);
      } catch (error) {
        console.error("Error fetching random states:", error.response?.data || error.message);
      }
    }

    fetchStates();
    fetchRandomStates();
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i <= rating ? '#FFD700' : '#ccc'}
        />
      );
    }
    return stars;
  };

  const handlePlaceClick = (state) => {
    navigate(`/cities?state=${state._id}`);
  };

  return (
    <>
      <div className="Home-container">
        <div className="form-image-container background-image" style={{backgroundImage: `url(${image1})`}}>
          <Navbar />
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
          <h3>Famous Places</h3>
          <div className="famous-places-grid">
            {randomStates.length > 0 ? (
              randomStates.map((state) => (
                <div key={state._id} className="place-card" onClick={() => handlePlaceClick(state)}>
                  <img src={state.imageUrl} alt={state._id} />
                  <h4>{state._id}</h4>
                  <div className='home-ratings'>{renderStars(state.ratings)}</div> 
                </div>
              ))
            ) : (
              <p>Loading recommended places...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
