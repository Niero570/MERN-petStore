import React from 'react';

function Footer() {
  return (
    <footer style={footerStyles}>
      <div style={footerContainerStyles}>
        {/* Brand Section */}
        <div style={brandSectionStyles}>
          <div style={logoContainerStyles}>
            <div style={bushidoLogoStyles}>
              🥷
            </div>
          </div>
          <h3 style={brandTitleStyles}>BushidoCoder dTCG</h3>
          <p style={brandDescriptionStyles}>
            Professional pet trading card game with battle arena mechanics
          </p>
        </div>

        {/* Links Section */}
        <div style={linksSectionStyles}>
          <h4 style={sectionTitleStyles}>Navigation</h4>
          <div style={linksGridStyles}>
            <a href="/" style={footerLinkStyles}>🏠 Home</a>
            <a href="/about" style={footerLinkStyles}>📖 About</a>
            <a href="/contact" style={footerLinkStyles}>📬 Contact</a>
            <a href="/gallery" style={footerLinkStyles}>🖼️ Gallery</a>
          </div>
        </div>

        {/* Social/Professional Links Section */}
        <div style={socialSectionStyles}>
          <h4 style={sectionTitleStyles}>Connect</h4>
          <div style={socialLinksStyles}>
            <a 
              href="https://linkedin.com/in/your-profile" 
              target="_blank" 
              rel="noopener noreferrer"
              style={socialLinkStyles}
              title="LinkedIn Profile"
            >
              <span style={socialIconStyles}>💼</span>
              LinkedIn
            </a>
            <a 
              href="https://github.com/your-username" 
              target="_blank" 
              rel="noopener noreferrer"
              style={socialLinkStyles}
              title="GitHub Profile"
            >
              <span style={socialIconStyles}>💻</span>
              GitHub
            </a>
            <a 
              href="mailto:your.email@example.com"
              style={socialLinkStyles}
              title="Email Contact"
            >
              <span style={socialIconStyles}>📧</span>
              Email
            </a>
            <a 
              href="https://your-portfolio.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={socialLinkStyles}
              title="Portfolio Website"
            >
              <span style={socialIconStyles}>🌐</span>
              Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={bottomSectionStyles}>
        <div style={footerContainerStyles}>
          <div style={bottomContentStyles}>
            <p style={copyrightStyles}>
              © 2024 BushidoCoder dTCG. Capstone Project - MERN Stack Development
            </p>
            <div style={techStackStyles}>
              <span style={techBadgeStyles}>MongoDB</span>
              <span style={techBadgeStyles}>Express</span>
              <span style={techBadgeStyles}>React</span>
              <span style={techBadgeStyles}>Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Styles
const footerStyles = {
  background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)',
  borderTop: '2px solid #8b4513',
  color: '#fff',
  marginTop: 'auto',
  width: '100%'
};

const footerContainerStyles = {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 20px'
};

const brandSectionStyles = {
  textAlign: 'center',
  padding: '40px 0 30px 0',
  borderBottom: '1px solid #333'
};

const logoContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '15px'
};

const bushidoLogoStyles = {
  fontSize: '2.5rem',
  padding: '15px',
  background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
  borderRadius: '50%',
  border: '3px solid #8b4513',
  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '70px',
  height: '70px'
};

const brandTitleStyles = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#ffd700',
  margin: '0 0 10px 0',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
};

const brandDescriptionStyles = {
  fontSize: '1rem',
  color: '#ccc',
  margin: 0,
  maxWidth: '400px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const linksSectionStyles = {
  padding: '30px 0',
  borderBottom: '1px solid #333'
};

const sectionTitleStyles = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#ffd700',
  margin: '0 0 20px 0',
  textAlign: 'center'
};

const linksGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '15px',
  textAlign: 'center'
};

const footerLinkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  padding: '10px 15px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  border: '1px solid transparent',
  display: 'block'
};

const socialSectionStyles = {
  padding: '30px 0',
  borderBottom: '1px solid #333'
};

const socialLinksStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '15px'
};

const socialLinkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  padding: '12px 20px',
  borderRadius: '25px',
  transition: 'all 0.3s ease',
  border: '1px solid #444',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.05)'
};

const socialIconStyles = {
  fontSize: '1.2rem'
};

const bottomSectionStyles = {
  background: 'rgba(0, 0, 0, 0.3)',
  borderTop: '1px solid #333'
};

const bottomContentStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 0',
  flexWrap: 'wrap',
  gap: '20px'
};

const copyrightStyles = {
  fontSize: '0.9rem',
  color: '#ccc',
  margin: 0
};

const techStackStyles = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap'
};

const techBadgeStyles = {
  background: 'linear-gradient(45deg, #8b4513, #a0522d)',
  color: '#fff',
  padding: '5px 12px',
  borderRadius: '15px',
  fontSize: '0.8rem',
  fontWeight: '500',
  border: '1px solid #8b4513'
};

// Add hover effects using CSS-in-JS
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    footer a:hover {
      background: rgba(255, 215, 0, 0.1) !important;
      border-color: #ffd700 !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 5px 15px rgba(255, 215, 0, 0.2) !important;
    }
    
    @media (max-width: 768px) {
      footer div[style*="justifyContent: space-between"] {
        flex-direction: column !important;
        text-align: center !important;
      }
      
      footer div[style*="gridTemplateColumns"] {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Footer;