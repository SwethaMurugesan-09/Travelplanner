import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/PersonDetials/PersonDetials'
const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        age: '',
        dob: '',
        number: ''
    });

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
                } else {
                    console.log(data.message || "Failed to fetch user profile");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    const bookedHotels=()=>{
        navigate(`/PersonDetials`);
    }

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
            <h2>Profile</h2>
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
                    <button onClick={updateProfile}>Update</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>Date of Birth:</strong> {user.dob}</p>
                    <p><strong>Phone Number:</strong> {user.number}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <div>
                <button onClick={bookedHotels}>View your booked hotels</button>
            </div>
        </div>
    );
};

export default Profile;
