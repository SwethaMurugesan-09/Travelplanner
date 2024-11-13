import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a UserContext to hold user information globally
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

// UserProvider component to wrap your app and provide user data
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user information from localStorage or from your API if necessary
        const storedUser = localStorage.getItem('email');
        if (storedUser) {
            setUser({ email: storedUser });  // Assuming user has an email attribute
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
