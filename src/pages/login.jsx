import React, { useState } from 'react';
import { useAuth } from '../content/authContent';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate('/dashboard');
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard'); // Redirect on success
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="login-container">
      <div className="login-form">
        <h2>Login to Pet Arena</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <div style={{ position: 'relative', width: '100%' }}>
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{ width: '100%', paddingRight: '30px' }}
  />
  <span
    onClick={() => setShowPassword((prev) => !prev)}
    style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      userSelect: 'none',
    }}
  >
    {showPassword ? '🙈' : '👁️'}
  </span>
</div>

          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;