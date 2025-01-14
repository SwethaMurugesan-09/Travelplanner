import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../styles/Home.css';
import home from '../components/travel_assets/home.jpg';

function Home() {
  const { isAuthenticated, userId } = useAuth(); // Access AuthContext
  const [states, setStates] = useState([]);
  const [randomStates, setRandomStates] = useState([]);
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    state: '',
    startTravelDate: '',
    endTravelDate: '',
  });
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await axios.get('http://localhost:5000/api/states');
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error.response?.data || error.message);
      }
    }

    async function fetchRandomStates() {
      try {
        const response = await axios.get('http://localhost:5000/api/randomstates');
        const sortedStates = response.data.sort((a, b) => b.ratings - a.ratings);
        setRandomStates(sortedStates);
      } catch (error) {
        console.error('Error fetching random states:', error.response?.data || error.message);
      }
    }

    async function fetchPackages() {
      try {
        const response = await axios.get('http://localhost:5000/package/get');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error.response?.data || error.message);
      }
    }

    fetchStates();
    fetchRandomStates();
    fetchPackages();
  }, []);

  const handleAddToFavourites = async (packageId) => {
    if (!isAuthenticated) {
      alert('Please log in to add to favourites.');
      return;
    }

    try {
      const token = localStorage.getItem('auth-token');
      const response = await axios.put(
        'http://localhost:5000/signup/addtofav',
        { userId, packageId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      alert("added");
    } catch (error) {
      // console.error('Error adding to favourites:', error.response?.data || error.message);
      alert('Already in favourites');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        color={i < rating ? '#FFD700' : '#ccc'}
      />
    ));
  };

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
      alert('Please select a state.');
    }
  };

  const handlePlaceClick = (state) => {
    navigate(`/cities?state=${state._id}`);
  };

  const handleExploreClick = (packageId) => {
    navigate(`/packages/${packageId}`);
  };

  return (
    <>
      <div className="Home-container">
  <div className="form-image-container background-image" style={{ backgroundImage: `url(${home})` }}>
    <Navbar />
    <div className="overlay-content">
      <h4>Welcome to Travey!!</h4>
      </div>

      <div  className="overlay-content1">
      <p>Discover your next adventure with us, where every journey is crafted for unforgettable memories. From serene beaches to majestic mountains, let us take you on the ultimate travel experience.</p>
    </div>
  </div>

  <form onSubmit={handleSubmit} className="form-content">
    <label>
      <select name="state" value={formData.state} onChange={handleInputChange}>
        <option value="">Select State</option>
        {states.length > 0 ? (
          states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))
        ) : (
          <option disabled>Loading states...</option>
        )}
      </select>
    </label>
    <button type="submit">Start Journey</button>
  </form>

  <div className="famous-places">
    <h3>Famous Places</h3>
    <div className="famous-places-grid">
      {randomStates.length > 0 ? (
        randomStates.map((state) => (
          <div key={state._id} className="famous-place-card" onClick={() => handlePlaceClick(state)}>
            <img src={state.imageUrl} alt={state._id} />
            <div className="famous-place-flex">
              <h4>{state._id}</h4>
              <div className="home-ratings">{renderStars(state.ratings)}</div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading recommended places...</p>
      )}
    </div>
  </div>

  <div className="home-packages">
    <h3>Packages</h3>
    <div className="home-packages-container">
      {packages.length > 0 ? (
        packages.map((pkg) => (
          <div key={pkg._id} className="home-package-card">
            <img src={pkg.imageUrl[0]} alt={pkg.city} className="home-package-img" />
            <div className="home-package-details">
              <div>
                <h4 className="home-package-city">{pkg.city}</h4>
              </div>
              <div>
                <h4 className="home-package-rate">₹{pkg.rate}</h4>
              </div>
            </div>
            <div className='home-package-btn'>
            <button className="home-package-button" onClick={() => handleExploreClick(pkg._id)}>
              Explore
            </button>
            <button className="home-package-button1" onClick={() => handleAddToFavourites(pkg._id)}>Add to Favo</button>
          </div>
          </div>
        ))
      ) : (
        <p>Loading packages...</p>
      )}
    </div>
  </div>

  <Footer />
</div>

    </>
  );
}

export default Home;
