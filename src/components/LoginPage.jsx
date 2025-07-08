// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../content/authContent';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="page-container">
      {/* Background */}
      <div style={backgroundStyles}>
        <div style={backgroundOverlayStyles}></div>
        
        {/* Main Content */}
        <div style={containerStyles}>
          {/* Login Card */}
          <div style={loginCardStyles}>
            {/* Header Section */}
            <div style={headerStyles}>
              <div style={iconStyles}>🏛️</div>
              <h1 style={titleStyles}>PET Sanctum</h1>
              <p style={subtitleStyles}>Primal Elemental Tiered Symbiosis</p>
            </div>

            {/* Error Display */}
            {error && (
              <div style={errorBoxStyles}>
                <span style={errorIconStyles}>⚠️</span>
                {error}
              </div>
            )}

            {/* Form Section */}
            <div style={formStyles}>
              <div style={inputGroupStyles}>
                <label style={labelStyles}>📧 Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyles}
                  disabled={loading}
                />
              </div>

              <div style={inputGroupStyles}>
                <label style={labelStyles}>🔒 Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  style={inputStyles}
                  disabled={loading}
                />
              </div>

              <button 
                onClick={handleLogin} 
                disabled={loading || !email || !password}
                style={{
                  ...buttonStyles,
                  ...(loading || !email || !password ? disabledButtonStyles : {})
                }}
              >
                {loading ? (
                  <>
                    <span style={spinnerStyles}>⚡</span>
                    Accessing Sanctum...
                  </>
                ) : (
                  <>
                    🏛️ Enter Sanctum
                  </>
                )}
              </button>
            </div>

            {/* Footer Section */}
            <div style={cardFooterStyles}>
              <p style={footerTextStyles}>
                New collector?{' '}
                <Link to="/signup" style={linkStyles}>
                  🔮 Build Your Sanctum
                </Link>
              </p>
              <p style={footerTextStyles}>
                <Link to="/" style={linkStyles}>
                  🏠 Return to Landing
                </Link>
              </p>
            </div>
          </div>

          {/* Side Decoration */}
          <div style={decorationStyles}>
            <div style={decorationIconStyles}>🐲</div>
            <div style={decorationTextStyles}>
              "Master the symbiosis between collector and creature"
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

// Styles
const backgroundStyles = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #000000 100%)',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
};

const backgroundOverlayStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 69, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(138, 43, 226, 0.05) 0%, transparent 50%)
  `,
  animation: 'mysticalGlow 8s ease-in-out infinite alternate'
};

const containerStyles = {
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  gap: '60px',
  maxWidth: '1200px',
  width: '100%'
};

const loginCardStyles = {
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '25px',
  padding: '50px 40px',
  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
  border: '3px solid rgba(255, 215, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  maxWidth: '500px',
  width: '100%',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden'
};

const headerStyles = {
  marginBottom: '40px'
};

const iconStyles = {
  fontSize: '4rem',
  marginBottom: '15px',
  display: 'block',
  textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
  animation: 'iconFloat 3s ease-in-out infinite'
};

const titleStyles = {
  fontSize: '3rem',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
  background: 'linear-gradient(45deg, #2c3e50, #34495e)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
};

const subtitleStyles = {
  fontSize: '1.1rem',
  color: '#6c757d',
  margin: 0,
  fontStyle: 'italic'
};

const errorBoxStyles = {
  background: 'linear-gradient(45deg, #ff4757, #ff6b6b)',
  color: '#fff',
  padding: '15px 20px',
  borderRadius: '15px',
  marginBottom: '25px',
  fontSize: '1rem',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxShadow: '0 5px 15px rgba(255, 71, 87, 0.3)'
};

const errorIconStyles = {
  fontSize: '1.2rem'
};

const formStyles = {
  marginBottom: '30px'
};

const inputGroupStyles = {
  marginBottom: '25px',
  textAlign: 'left'
};

const labelStyles = {
  display: 'block',
  fontSize: '1rem',
  fontWeight: '600',
  color: '#2c3e50',
  marginBottom: '8px'
};

const inputStyles = {
  width: '100%',
  padding: '18px 20px',
  fontSize: '1.1rem',
  border: '2px solid #e9ecef',
  borderRadius: '15px',
  background: '#fff',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box',
  fontFamily: 'inherit'
};

const buttonStyles = {
  width: '100%',
  padding: '18px 20px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '15px',
  background: 'linear-gradient(45deg, #ff6b6b, #ff8787)',
  color: '#fff',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
};

const disabledButtonStyles = {
  background: 'linear-gradient(45deg, #bdc3c7, #95a5a6)',
  cursor: 'not-allowed',
  boxShadow: '0 5px 15px rgba(149, 165, 166, 0.3)'
};

const spinnerStyles = {
  animation: 'spin 1s linear infinite'
};

const cardFooterStyles = {
  borderTop: '1px solid #e9ecef',
  paddingTop: '25px',
  marginTop: '25px'
};

const footerTextStyles = {
  margin: '10px 0',
  color: '#6c757d',
  fontSize: '0.95rem'
};

const linkStyles = {
  color: '#ff6b6b',
  textDecoration: 'none',
  fontWeight: '600',
  transition: 'color 0.3s ease'
};

const decorationStyles = {
  textAlign: 'center',
  color: '#fff',
  maxWidth: '300px'
};

const decorationIconStyles = {
  fontSize: '12rem',
  color: '#ffd700',
  textShadow: '0 0 50px rgba(255, 215, 0, 0.8)',
  animation: 'dragonFloat 6s ease-in-out infinite',
  marginBottom: '20px',
  display: 'block'
};

const decorationTextStyles = {
  fontSize: '1.3rem',
  fontStyle: 'italic',
  lineHeight: '1.6',
  color: '#e8e8e8',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
};

// Add CSS animations
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes mysticalGlow {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.05); }
    }
    
    @keyframes iconFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }
    
    @keyframes dragonFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Input focus effects */
    input:focus {
      outline: none !important;
      border-color: #ffd700 !important;
      box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2) !important;
      transform: translateY(-2px) !important;
    }
    
    /* Button hover effects */
    button:not(:disabled):hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4) !important;
    }
    
    /* Link hover effects */
    a:hover {
      color: #ffd700 !important;
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
      .login-container {
        flex-direction: column !important;
        gap: 30px !important;
        padding: 20px !important;
      }
      
      .login-card {
        max-width: 100% !important;
        padding: 30px 25px !important;
      }
      
      .decoration {
        display: none !important;
      }
      
      h1 {
        font-size: 2.5rem !important;
      }
      
      .dragon-icon {
        font-size: 8rem !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default LoginPage;