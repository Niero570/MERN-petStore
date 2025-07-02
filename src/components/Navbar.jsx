// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav style={{ padding: '10px', background: '#ddd' }}>
      <Link to="/">Home</Link>{" | "}
      <Link to="/about">About</Link>{" | "}
      <Link to="/contact">Contact</Link>{" | "}
      <Link to="/sanctum">Sanctum</Link>{"|"}
      {user && <Link to="/dashboard">Dashboard</Link>}
    </nav>
  );
}

export default Navbar;
