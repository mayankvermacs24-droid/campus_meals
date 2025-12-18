import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Custom hook to easily use the auth context
export const useAuth = () => {
    // CRITICAL: Checks if the hook is used outside the provider
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    // Return all context values, including the newly added userId
    return context;
};

// 3. Provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null); 
    const [loading, setLoading] = useState(true); // Default to true to prevent initial crash

    // Load initial state from localStorage when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        const storedUserId = localStorage.getItem('userId'); //  NEW: Get ID from storage
        
        if (token && role && storedUserId) { // Check if all three essential parts exist
            setIsAuthenticated(true);
            setUserRole(role);
            setUserId(storedUserId); // Set the ID
        }
        setLoading(false); // Finished checking local storage
    }, []);

    // Function to handle login
    // CRITICAL: Accept the userId argument from Signin.jsx
    const login = (token, role, newUserId) => { 
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', newUserId); // Store the ID
        
        setIsAuthenticated(true);
        setUserRole(role);
        setUserId(newUserId); //  Set the ID state
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId'); //  Remove the ID
        
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null); // Clear the ID state
    };

    const value = {
        isAuthenticated,
        userRole,
        userId, // EXPOSE THE USER ID
        loading,
        login,
        handleLogout,
    };

    // CRITICAL: Only render children (the rest of the app) when loading is complete
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};