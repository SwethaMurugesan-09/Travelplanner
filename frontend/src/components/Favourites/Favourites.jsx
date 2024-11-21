import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Favourites.css';

const Favourites = () => {
    const { userId, isAuthenticated } = useAuth(); // Fetch userId and isAuthenticated from AuthContext
    const [favouritePackages, setFavouritePackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            alert('Please log in to view your favourites.');
            navigate('/login'); // Redirect to login page if not authenticated
            return;
        }

        const fetchFavourites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/signup/favourites', {
                    params: { userId },
                });
                setFavouritePackages(response.data.packages || []);
            } catch (error) {
                console.error('Error fetching favourites:', error.response?.data || error.message);
                alert('Failed to fetch favourites.');
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) fetchFavourites(); // Fetch favourites only if userId is available
    }, [userId, isAuthenticated, navigate]);

    const handleRemoveFavourite = async (packageId) => {
        try {
            const response = await axios.delete('http://localhost:5000/signup/removefromfav', {
                data: { userId, packageId }, // Use `data` to send the body with a DELETE request
            });
            alert(response.data.message); // Optional: show success message
            // Remove the package from the local state
            setFavouritePackages(prev => prev.filter(pkg => pkg._id !== packageId));
        } catch (error) {
            console.error('Error removing package from favourites:', error.response?.data || error.message);
            alert('Failed to remove package from favourites.');
        }
    };
    

    const handleExploreClick = (packageId) => {
        navigate(`/packages/${packageId}`);
    };

    return (
        <>
            <div className="favourites-page-container">
                <Navbar />
                <div>
                    <h3 className="fav-txt">Your Favourites</h3>
                </div>
                <div className="favourites-content">
                    {isLoading ? (
                        <p>Loading your favourites...</p>
                    ) : favouritePackages.length > 0 ? (
                        <div className="favourites-grid">
                            {favouritePackages.map((pkg) => (
                                <div key={pkg._id} className="favourites-card">
                                    {pkg.imageUrl && pkg.imageUrl[0] ? (
                                        <img
                                            src={pkg.imageUrl[0]}
                                            alt={pkg.city || 'Package'}
                                            className="favourites-img"
                                        />
                                    ) : (
                                        <div className="favourites-placeholder">
                                            No Image Available
                                        </div>
                                    )}
                                    <div className="favourites-details">
                                        <h4>{pkg.city || 'Unknown City'}</h4>
                                        <h4>₹{pkg.rate || 'N/A'}</h4>
                                    </div>


                                    <div className="favourite-remove-fav">
                                    <div>
                                    <button
                                        className="favourites-button"
                                        onClick={() => handleExploreClick(pkg._id)}
                                    >
                                        Explore
                                    </button>
                                    </div>
                                    <div>
                                    <button className='fav-remove' onClick={() => handleRemoveFavourite(pkg._id)}>Remove Favourite</button>

                                    </div></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>You have no favourites yet.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Favourites;
