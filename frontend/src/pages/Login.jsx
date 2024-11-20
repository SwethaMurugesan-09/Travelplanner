import React, { useState } from 'react';
import '../styles/Login.css';
import { useAuth } from '../context/AuthContext'; // Ensure you import useAuth
import Navbar from '../components/Navbar/Navbar';
const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const { login } = useAuth(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = { email, password };
        console.log('Login attempted with:', formData);

        try {
            const response = await fetch('http://localhost:5000/signup/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                login(data.token); 
            } else {
                alert(data.errors || "User does not exist. Please create an account.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("There was an error logging in.");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = { username, email, password };
        console.log("Signup attempted with:", formData);

        try {
            const response = await fetch('http://localhost:5000/signup/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                setIsLogin(true); 
                alert("Signup successful! Please log in.");
            } else {
                alert(data.errors || "Email already registered.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("There was an error processing your request.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (isLogin) {
                handleLogin(e);
            } else {
                handleSignup(e);
            }
        }
    };

    const isLoginEnabled = email && password;
    const isSignupEnabled = username && email && password;

    return (
        <div className="auth-total-container">
            <div className="login-navbar">
                <Navbar/>
            </div>
            <div className="auth-container">
                <div className="authContainer">
                    {isLogin ? (
                        <>
                            <div className="login-container">
                            <h2 className="login-heading">Login</h2>
                                <div className="login-content">
                                    <form onSubmit={handleLogin}>
                                        <div className="login-inputGroup">
                                            <label htmlFor="email" className="login-label">Email:</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyDown={handleKeyPress}
                                                className="login-input"
                                            />
                                        </div>
                                        <div className="login-inputGroup">
                                            <label htmlFor="password" className="login-label">Password:</label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onKeyDown={handleKeyPress}
                                                className="login-input"
                                            />
                                        </div>
                                        <button type="submit" className="login-button" disabled={!isLoginEnabled}>
                                            Login
                                        </button>
                                    </form>
                                    <span className="login-footer">
                                        Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Sign up here</a>
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            
                            <div className="login-container">
                                <h2 className="login-heading1">Sign Up</h2>
                                <div className="login-content">
                                    <form onSubmit={handleSignup}>
                                        <div className="login-inputGroup">
                                            <label htmlFor="username" className="login-label">Username:</label>
                                            <input
                                                type="text"
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                onKeyDown={handleKeyPress}
                                                className="login-input"
                                            />
                                        </div>
                                        <div className="login-inputGroup">
                                            <label htmlFor="email" className="login-label">Email:</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onKeyDown={handleKeyPress}
                                                className="login-input"
                                            />
                                        </div>
                                        <div className="login-inputGroup">
                                            <label htmlFor="password" className="login-label">Password:</label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onKeyDown={handleKeyPress}
                                                className="login-input"
                                            />
                                        </div>
                                        <button type="submit" className="login-button" disabled={!isSignupEnabled}>
                                            Sign Up
                                        </button>
                                    </form>
                                    <span className="login-footer">
                                        Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login here</a>
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
