import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth'; // Adjust the import path as necessary

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    alert("Silakan Login Terlebih Dahulu"); // Show alert if not authenticated
    return <Navigate to="/" />; // Redirect to the login page
  }

  return <Outlet />; // Render the protected route if authenticated
};

export default ProtectedRoute;