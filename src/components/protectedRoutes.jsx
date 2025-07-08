import React from 'react';
import { useAuth } from '../content/authContent';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return children;
}

export default ProtectedRoute;