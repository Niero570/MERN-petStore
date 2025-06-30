import React, { useState } from 'react';

function App() {
  //Login state form

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //Login handle
  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        setError('');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error - make sure your server is running on port 5000');
    }
    setLoading(false);
  };

  //Logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      {user ? (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '32px' }}>
          <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
            {/*header here*/}
            <div style={{ backgroundColor: 'sky blue', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>Bushido Coder dTCG</h1>
                  <p style={{ color: '14px', color: '#664', margin: 0 }}>Currency: {user.currency} coins</p>
                  <button
                    onClick={handleLogout}
                    style={{
                      marginTop: '8px',
                      backgroundColor: '#ef4444',
                      color: "white",
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>Logout
                  </button>
                </div>
              </div>
            </div>

            {/*A dashboard*/}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgb(0, 0, 0, 0.1)', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>My profile</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '4px' }}>
                  <h3 style={{ fontWeight: '600', margin: '0 0 8px 0' }}>Username</h3>
                  <p style={{ margin: 0 }}>{user.username}</p>
                </div>
                <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '4px' }}>
                  <h3 style={{ fontWeight: '600', margin: '0 0 8px 0' }}>Email</h3>
                  <p style={{ margin: 0 }}>{user.email}</p>
                </div>
                <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '4px' }}>
                  <h3 style={{ fontWeight: '600', margin: '0 0 8px 0' }}>Currency</h3>
                  <p style={{ margin: 0 }}>{user.currency} coins</p>
                </div>
                <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '4px' }}>
                  <h3 style={{ fontWeight: '600', margin: '0 0 8px 0' }}>Token Status</h3>
                  <p style={{ fontSize: '12px', color: '#059669', margin: 0 }}>✅ Authenticated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) :
(
  <div style={{ 
    minHeight: '100vh', 
    backgroundColor: '#f5f5f5', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    <div style={{ 
      backgroundColor: 'white', 
      padding: '32px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
      width: '100%', 
      maxWidth: '400px' 
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: '24px',
        color: '#1a1a1a'
      }}>
        BushidoCoder dTCG
      </h1>
      
      <h2 style={{ 
        fontSize: '20px', 
        textAlign: 'center', 
        marginBottom: '24px', 
        color: '#666' 
      }}>
        Login to Your Account
      </h2>
      
      {/* Error display - only shows when there's an error */}
      {error && (
        <div style={{ 
          backgroundColor: '#fee2e2', 
          border: '1px solid #fecaca', 
          color: '#dc2626', 
          padding: '12px', 
          borderRadius: '4px', 
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {/* Email input field */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ 
          display: 'block', 
          color: '#374151', 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '8px' 
        }}>
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '4px', 
            fontSize: '16px',
            boxSizing: 'border-box',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
      </div>

      {/* Password input field */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          color: '#374151', 
          fontSize: '14px', 
          fontWeight: '600', 
          marginBottom: '8px' 
        }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '4px', 
            fontSize: '16px',
            boxSizing: 'border-box',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
        />
      </div>

      {/* Login button */}
      <button
        onClick={handleLogin}
        disabled={loading || !email || !password}
        style={{ 
          width: '100%', 
          backgroundColor: (loading || !email || !password) ? '#9ca3af' : '#3b82f6', 
          color: 'white', 
          padding: '12px', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: (loading || !email || !password) ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'background-color 0.2s'
        }}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      {/* Helper text for testing */}
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
          Test Account: fakepass123@gmail.com
        </p>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
  




export default App
