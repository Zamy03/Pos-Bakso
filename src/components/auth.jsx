import React, { createContext, useState, useContext, useEffect } from 'react';

// Create an AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for a token on initial load
    return localStorage.getItem('token') !== null;
  });

  const setLogin = (token) => {
    setIsAuthenticated(true);
    // Store the token in localStorage
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Remove the token from localStorage
    localStorage.removeItem('token');
  };

  // Optional: You can also add an effect to handle token expiration or validation
  useEffect(() => {
    // Example: Check if the token is still valid (you can implement your own logic)
    const token = localStorage.getItem('token');
    if (token) {
      // Validate the token if necessary
      // If invalid, call logout()
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};