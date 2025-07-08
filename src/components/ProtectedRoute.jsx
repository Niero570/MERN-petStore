import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../content/authContent';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={loadingStyles}>
        <div style={spinnerStyles}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

const loadingStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
  gap: '20px'
};

const spinnerStyles = {
  width: '40px',
  height: '40px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #ffd700',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};

// Add spinner animation
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default ProtectedRoute;