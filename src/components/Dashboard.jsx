// src/components/Dashboard.jsx/SanctumDashboard
import React from 'react';

import SanctumDashboard from './SanctumDashboard';

function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard">
      <h1>Welcome, {user.username}</h1>
      <p>Currency: {user.currency} coins</p>
      <p>Email: {user.email}</p>
      <p>Status: ✅ Authenticated</p>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
