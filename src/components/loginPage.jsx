// src/components/LoginPage.jsx
import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.success) {
        onLogin(data.user, data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error – is your backend on port 5000?');
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h1>BushidoCoder dTCG</h1>
      <p>Login to Your Account</p>

      {error && <div className="error-box">{error}</div>}

      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />

      <button onClick={handleLogin} disabled={loading || !email || !password}>
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </div>
  );
}

export default LoginPage;
