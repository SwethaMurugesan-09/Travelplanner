import React, { useState } from 'react';
import './Contact.css';
import Navbar from '../Navbar/Navbar';
import { motion } from 'framer-motion';
import smiley from '../travel_assets/happiness.png';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import Footer from '../Footer/Footer';

const Contact = () => {
    const { isAuthenticated, login } = useAuth(); // Access authentication state and login function
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        queries: '',
    });

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    // Handle change for both forms
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/signup/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (data.success) {
                login(data.token); // Login user
            } else {
                alert(data.errors || "User does not exist. Please create an account.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("There was an error logging in.");
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "1952d936-2c92-4a85-a80b-8a1b5543dc4a");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            setSubmitted(true);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    const buttonVariants = {
        hover: { scale: 1.1 },
        tap: { scale: 0.9 },
    };

    return (
        <>
        <div className="contact-form-total-container">
            <Navbar />
            {!isAuthenticated ? (
                <motion.div
                    className="auth-container"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="login-heading">Login to Contact Us</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="login-inputGroup">
                            <label htmlFor="email" className="login-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                className="login-input"
                                required
                            />
                        </div>
                        <div className="login-inputGroup">
                            <label htmlFor="password" className="login-label">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                className="login-input"
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </motion.div>
            ) : !submitted ? (
                <motion.div
                    className="contact-form-container"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2
                        className="contact-title"
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Contact Us
                    </motion.h2>
                    <form className="contact-form" onSubmit={onSubmit}>
                        <div className="contact-form-group">
                            <label htmlFor="name" className="contact-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="contact-input"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="contact-form-group">
                            <label htmlFor="email" className="contact-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="contact-input"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="contact-form-group">
                            <label htmlFor="queries" className="contact-label">Queries</label>
                            <textarea
                                id="queries"
                                name="queries"
                                value={formData.queries}
                                onChange={handleChange}
                                required
                                className="contact-textarea"
                                placeholder="Enter your queries"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="contact-submit-btn"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Submit
                        </motion.button>
                    </form>
                </motion.div>
            ) : (
                <motion.div
                    className="success-message-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={smiley} alt="Smiley" style={{ width: '100px', marginBottom: '10px' }} />
                    <p className="contact-success-message">
                        Thank you! We have received your query.
                    </p>
                </motion.div>
            )}
          
        </div>
        <div>
            <Footer/>
        </div>
        </>
    );
};

export default Contact;
