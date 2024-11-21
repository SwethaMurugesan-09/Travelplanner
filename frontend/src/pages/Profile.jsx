import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import '../styles/Profile.css';
import Footer from '../components/Footer/Footer';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        age: '',
        dob: '',
        number: '',
        image: '', // Add image to updatedUser state
    });
    const [imagePreview, setImagePreview] = useState('');

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('auth-token');
            try {
                const response = await fetch('http://localhost:5000/signup/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setUser(data.user);
                    setUpdatedUser(data.user);
                    setImagePreview(data.user.image); // Set the image preview
                } else {
                    console.log(data.message || "Failed to fetch user profile");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    // Handle image change (preview)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result); // Display image preview
                setUpdatedUser({ ...updatedUser, image: reader.result }); // Save the base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    // Navigate to booked hotels page
    const bookedHotels = () => {
        navigate(`/PersonDetials`);
    };

    // Update user profile
    const updateProfile = async () => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch('http://localhost:5000/signup/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.user); // Update the displayed profile with the latest data
                setIsEditing(false); // Exit edit mode
                alert("Profile updated successfully!");
            } else {
                console.log(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <div className="profile-navbar">
                <Navbar />
            </div>
            <div className="profile-container1">
                <h2>Your Profile</h2>
            </div>

            <div className='profile-container'>
                <div className="profile-image-section">
                    {user.image && <img className='profile-img' src={user.image} alt="Profile" />}
                    <h2>{user.name}</h2>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>

                {/* Right Section: Profile Details */}
                <div className="profile-details-section">
                    <h3>{user.name}</h3>
                    {isEditing ? (
                        <>
                            <div>
                                <label><strong>Name:</strong></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedUser.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label><strong>Email:</strong></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedUser.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label><strong>Age:</strong></label>
                                <input
                                    type="number"
                                    name="age"
                                    value={updatedUser.age}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label><strong>Date of Birth:</strong></label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={updatedUser.dob}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label><strong>Phone Number:</strong></label>
                                <input
                                    type="text"
                                    name="number"
                                    value={updatedUser.number}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label><strong>Profile Picture:</strong></label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <div className="image-preview">
                                        <img src={imagePreview} alt="Profile Preview" />
                                    </div>
                                )}
                            </div>
                            <div className="buttons">
                                <button onClick={updateProfile}>Update</button>
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Age:</strong> {user.age}</p>
                            <p><strong>Date of Birth:</strong> {user.dob}</p>
                            <p><strong>Phone Number:</strong> {user.number}</p>
                            <div className="buttons">
                                <button onClick={bookedHotels}>View your booked hotels</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Profile;
