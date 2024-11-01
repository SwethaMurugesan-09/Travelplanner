import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import img1 from '../components/travel_assets/login-img.jpg';
import img2 from '../components/travel_assets/signup-img.jpg';
const Login = () => {
    // State for managing login and signup view
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            setIsAuthenticated(true); 
        }
    }, []);

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
            setIsAuthenticated(true);  // Set the user as logged in
            window.location.replace("/login");
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
            setIsAuthenticated(true);  
            window.location.replace("/home");  // Redirect to homepage or another page
        } else {
            alert(responseData ? responseData.errors : "Email already registered.");
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('auth-token');  // Remove token from localStorage
        setIsAuthenticated(false);             // Set the user as logged out
        window.location.replace("/");          // Redirect to homepage or login page
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

    return (
        <div className="auth-total-container">
            <div className="auth-container">
                <div className="authContainer">
                        <>
                            {isLogin ? (
                                <>
                                <h2 className="login-heading">Login</h2>
                                <div className="login-container">
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
                                        <button type="submit" className="login-button">Login</button>
                                    </form>
                                    <span className="login-footer">Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Sign up here</a></span>
                               </div>
                               
                               <div className="login-img">
                                    <img src={img2}/>
                               </div>
                               </div> </>
                            ) : (
                                <>
                                
                                    <h2 className="login-heading">Sign Up</h2>
                                    <div className="login-container">
                                    <div className="login-img">
                                        <img src={img1}/>
                                    </div>
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
                                        <button type="submit" className="login-button">Sign Up</button>
                                    </form>
                                    <span className="login-footer">Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login here</a></span>
                                </div></div></>
                            )}
                        </>
                </div>
            </div>
        </div>
    );
};

export default Login;
