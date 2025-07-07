// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import About from './components/About';
import Contacts from './components/Contacts';
import Posts from './components/Posts';
import SanctumDashboard from './components/SanctumDashboard';
import SanctumBattleArena from './components/battle-arena';
import BattleTest from './components/BattleTest';
import BattleArenaSimple from './components/BattleArenaSimple';
import BattleArenaTest from './components/battle-arena-test';
import TestNavigation from './components/TestNavigation';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/posts/:post_id" element={<Posts />} />
          <Route path="/sanctum" element={<SanctumDashboard token={token} />} />
          <Route path="/battle" element={<SanctumBattleArena />} />
          <Route path="/battle-full" element={<SanctumBattleArena />} />
          <Route path="/battle-test" element={<BattleArenaTest />} />
          <Route path="/test-nav" element={<TestNavigation />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;