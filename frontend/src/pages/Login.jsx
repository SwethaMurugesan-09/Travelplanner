import React, { useState } from 'react';
import '../styles/Login.css';
import Navbar from '../components/Navbar/Navbar';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = { email, password };
        console.log('Login attempted with:', formData);

        let responseData;
        await fetch('http://localhost:5000/signup/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => responseData = data)
        .catch((error) => {
            console.error("Error during login:", error);
        });

        if (responseData && responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            console.log("Token in localStorage:", localStorage.getItem('auth-token'));
            window.location.replace("/");
        } else {
            alert(responseData ? responseData.errors : "User does not exist. Please create an account.");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = { username, email, password };
        console.log("Signup attempted with:", formData);

        let responseData;
        await fetch('http://localhost:5000/signup/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => responseData = data)
        .catch((error) => {
            console.error("Error during signup:", error);
            alert("There was an error processing your request.");
        });

        if (responseData && responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData ? responseData.errors : "Email already registered.");
        }
    };

    return (
        <div className="auth-total-container">
            <Navbar/>
        <div className="auth-container">
            <div className="authContainer">
                {isLogin ? (
                    <>
                        <h2 className="login-heading">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="login-inputGroup">
                                <label htmlFor="email" className="login-label">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    className="login-input"
                                />
                            </div>
                            <button type="submit" className="login-button">Login</button>
                        </form>
                        <span className="login-footer">Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Sign up here</a></span>
                    </>
                ) : (
                    <>
                        <h2 className="login-heading">Sign Up</h2>
                        <form onSubmit={handleSignup}>
                            <div className="login-inputGroup">
                                <label htmlFor="username" className="login-label">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                                    className="login-input"
                                />
                            </div>
                            <button type="submit" className="login-button">Sign Up</button>
                        </form>
                        <span className="login-footer">Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login here</a></span>
                    </>
                )}
            </div>
        </div></div>
    );
};

export default Login;
