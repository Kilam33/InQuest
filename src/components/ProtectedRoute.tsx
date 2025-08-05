import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase';

const ProtectedRoute = () => {
  const user = auth.currentUser;

  if (!user) {
    // User is not authenticated, redirect to sign-in page
    return <Navigate to="/signin" />;
  }

  // User is authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;