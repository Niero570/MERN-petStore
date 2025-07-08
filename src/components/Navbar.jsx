import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../content/authContent';

function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={navStyles}>
      <div style={navContainerStyles}>
        {/* Logo/Brand */}
        <Link to="/" style={brandStyles}>
          🏛️ PET Sanctum
        </Link>

        {/* Desktop Navigation */}
        <div style={desktopNavStyles}>
          <Link to="/" style={navLinkStyles}>🏠 Home</Link>
          <Link to="/about" style={navLinkStyles}>📖 About</Link>
          <Link to="/contact" style={navLinkStyles}>📬 Contact</Link>
          <Link to="/gallery" style={navLinkStyles}>🔮 Collection</Link>
          {user && <Link to="/sanctum" style={navLinkStyles}>🏛️ Sanctum</Link>}
          {user && <Link to="/battle" style={battleLinkStyles}>⚔️ Battle Arena</Link>}
          {user && <Link to="/dashboard" style={navLinkStyles}>👤 Dashboard</Link>}
          {user ? (
            <div style={userMenuStyles}>
              <span style={userNameStyles}>👋 {user.username}</span>
              <button 
                onClick={() => {
                  console.log('Logout clicked');
                  logout();
                }} 
                style={logoutButtonStyles}
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <div style={authLinksStyles}>
              <Link to="/login" style={authLinkStyles}>🏛️ Login</Link>
              <Link to="/signup" style={authLinkStyles}>🔮 Collect</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          style={mobileButtonStyles}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div style={mobileNavStyles}>
          <Link to="/" style={mobileNavLinkStyles} onClick={() => setIsMenuOpen(false)}>
            🏠 Home
          </Link>
          <Link to="/about" style={mobileNavLinkStyles} onClick={() => setIsMenuOpen(false)}>
            📖 About
          </Link>
          <Link to="/contact" style={mobileNavLinkStyles} onClick={() => setIsMenuOpen(false)}>
            📬 Contact
          </Link>
          <Link to="/gallery" style={mobileNavLinkStyles} onClick={() => setIsMenuOpen(false)}>
            🔮 Collection
          </Link>     
          {user && (
            <Link to="/sanctum" style={mobileNavLinkStyles} onClick={() => setIsMenuOpen(false)}>
              🏛️ Sanctum
            </Link>
          )}
          {user && (
            <Link to="/battle" style={mobileBattleLinkStyles} onClick={() => setIsMenuOpen(false)}>
              ⚔️ Battle Arena
            </Link>
          )}
          {user && (
            <Link to="/dashboard" style={mobileNavLinkStyles} onClick={() => setIsMenuOpen(false)}>
              👤 Dashboard
            </Link>
          )}
          {user && (
            <div style={mobileUserMenuStyles}>
              <span style={userNameStyles}>👋 {user.username}</span>
              <button onClick={logout} style={mobileLogoutButtonStyles}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

// Styles
const navStyles = {
  background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)',
  borderBottom: '2px solid #8b4513',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  width: '100%'
};

const navContainerStyles = {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '60px'
};

const brandStyles = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#ffd700',
  textDecoration: 'none',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
};

const desktopNavStyles = {
  display: 'flex',
  gap: '30px',
  alignItems: 'center'
};

const navLinkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  padding: '8px 16px',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  border: '1px solid transparent'
};

const battleLinkStyles = {
  ...navLinkStyles,
  background: 'linear-gradient(45deg, #ff6b6b, #ff8787)',
  border: '1px solid #ff6b6b',
  fontWeight: 'bold'
};

const mobileButtonStyles = {
  display: 'none',
  background: 'transparent',
  border: 'none',
  color: '#ffd700',
  fontSize: '1.5rem',
  cursor: 'pointer',
  padding: '8px'
};

const mobileNavStyles = {
  display: 'none',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)',
  borderTop: '1px solid #444',
  padding: '20px'
};

const mobileNavLinkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: '500',
  padding: '12px 16px',
  borderRadius: '8px',
  margin: '5px 0',
  transition: 'all 0.3s ease',
  border: '1px solid transparent'
};

const mobileBattleLinkStyles = {
  ...mobileNavLinkStyles,
  background: 'linear-gradient(45deg, #ff6b6b, #ff8787)',
  border: '1px solid #ff6b6b',
  fontWeight: 'bold'
};

const userMenuStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
};

const userNameStyles = {
  color: '#ffd700',
  fontSize: '0.9rem',
  fontWeight: '500'
};

const logoutButtonStyles = {
  background: 'linear-gradient(45deg, #ff4757, #ff6b6b)',
  border: '1px solid #ff4757',
  color: '#fff',
  fontSize: '0.9rem',
  fontWeight: '500',
  padding: '8px 12px',
  borderRadius: '15px',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const mobileUserMenuStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '10px 16px',
  borderTop: '1px solid #444',
  marginTop: '10px'
};

const mobileLogoutButtonStyles = {
  ...logoutButtonStyles,
  alignSelf: 'flex-start'
};

const authLinksStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
};

const authLinkStyles = {
  color: '#ffd700',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: '500',
  padding: '8px 12px',
  borderRadius: '15px',
  border: '1px solid #ffd700',
  transition: 'all 0.3s ease'
};

// Add media query styles using CSS-in-JS approach
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      nav div[style*="display: flex"] {
        display: none !important;
      }
      nav button {
        display: block !important;
      }
      nav div[style*="flexDirection: column"] {
        display: flex !important;
      }
    }
    
    nav a:hover {
      background: rgba(255, 215, 0, 0.1) !important;
      border-color: #ffd700 !important;
      transform: translateY(-2px) !important;
    }
    
    nav a[style*="linear-gradient"]:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3) !important;
    }
  `;
  document.head.appendChild(style);
}

export default Navbar;
