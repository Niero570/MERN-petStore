import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="page-container">
      {/* Epic Hero Section */}
      <section style={heroSectionStyles}>
        <div style={heroBackgroundStyles}></div>
        <div style={heroOverlayStyles}></div>
        <div style={heroContentStyles}>
          <div style={heroTextContainerStyles}>
            <h1 style={heroTitleStyles}>
              <span style={titleLineStyles}>BUSHIDO CODER'S</span>
              <span style={titleMainStyles}>PET SANCTUM</span>
              <span style={titleSubStyles}>Primal Elemental Tiered Symbiosis</span>
            </h1>
            <p style={heroDescStyles}>
              🔮 Discover and collect legendary PETs with elemental powers across mystical tiers. 
              Build your ultimate Sanctum, master symbiotic bonds, and become the supreme PET Collector.
            </p>
            <div style={heroButtonsStyles}>
              <Link to="/login" style={primaryButtonStyles}>
                🏛️ Enter Sanctum
              </Link>
              <Link to="/signup" style={secondaryButtonStyles}>
                🔮 Start Collecting
              </Link>
              <Link to="/gallery" style={tertiaryButtonStyles}>
                👁️ View Collection
              </Link>
            </div>
          </div>
          <div style={heroImageContainerStyles}>
            <div style={samuraiSilhouetteStyles}>⚔️</div>
            <div style={dragonSilhouetteStyles}>🐲</div>
            <div style={mysticalGlowStyles}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={featuresContainerStyles}>
        <div style={sectionHeaderStyles}>
          <h2 style={sectionTitleStyles}>⚡ The Collection Awaits</h2>
          <p style={sectionDescStyles}>
            Master the ancient art of PET collection and symbiotic bonding
          </p>
        </div>
        
        <div style={featuresGridStyles}>
          <div style={featureCardStyles}>
            <div style={featureIconStyles}>🖼️</div>
            <h3 style={featureHeadingStyles}>Legendary Gallery</h3>
            <p style={featureTextStyles}>
              Discover 21 unique creatures across 5 tiers of power. From humble Protectors to fearsome Dissonants, 
              each creature holds secrets waiting to be unlocked.
            </p>
            <div style={featureStatsStyles}>
              <span style={statBadgeStyles}>21 Creatures</span>
              <span style={statBadgeStyles}>5 Tiers</span>
              <span style={statBadgeStyles}>4 Elements</span>
            </div>
          </div>

          <div style={featureCardStyles}>
            <div style={featureIconStyles}>🏛️</div>
            <h3 style={featureHeadingStyles}>Sanctum Mastery</h3>
            <p style={featureTextStyles}>
              Build your collection and watch your Sanctum evolve. Progress from Alpha to Prime to Apex, 
              unlocking devastating bonuses and exclusive creatures.
            </p>
            <div style={featureStatsStyles}>
              <span style={statBadgeStyles}>3 Sanctum Tiers</span>
              <span style={statBadgeStyles}>Evolution Bonuses</span>
              <span style={statBadgeStyles}>Prestige System</span>
            </div>
          </div>

          <div style={featureCardStyles}>
            <div style={featureIconStyles}>⚔️</div>
            <h3 style={featureHeadingStyles}>Epic Battles</h3>
            <p style={featureTextStyles}>
              Engage in strategic turn-based combat with advanced psychological attributes. 
              Aggression, Intuition, Intimidation, and Intensity determine victory.
            </p>
            <div style={featureStatsStyles}>
              <span style={statBadgeStyles}>4 Core Attributes</span>
              <span style={statBadgeStyles}>Type Advantages</span>
              <span style={statBadgeStyles}>Special Attacks</span>
            </div>
          </div>
        </div>
      </section>

      {/* PET Sanctum Lore Section */}
      <section style={loreContainerStyles}>
        <div style={loreBackgroundStyles}></div>
        <div style={loreContentStyles}>
          <div style={loreTextSectionStyles}>
            <h2 style={loreTitleStyles}>🔥 The Ancient Prophecy</h2>
            <div style={loreQuoteStyles}>
              <p style={loreTextStyles}>
                "In the age when mystical creatures roamed free across the realms, 
                the Bushido Coders emerged as legendary PET Collectors. Armed with sacred Sanctums that 
                could nurture the essence of any creature, they sought to build the most powerful 
                symbiotic bonds across all tiers."
              </p>
              <p style={loreTextStyles}>
                "But beware, young collector - for as your Sanctum grows, so too does the 
                responsibility. The path from Protector to Dissonant is treacherous, and only the 
                most skilled can master the Primal Elemental Tiered Symbiosis without losing themselves to the 
                creatures' power."
              </p>
            </div>
            <div style={loreCallToActionStyles}>
              <h3 style={ctaTitleStyles}>Will you rise to become a Master Collector?</h3>
              <Link to="/gallery" style={ctaButtonStyles}>
                🔮 Start Your Collection
              </Link>
            </div>
          </div>
          <div style={loreVisualStyles}>
            <div style={mysticalSymbolStyles}>⚡</div>
            <div style={runesContainerStyles}>
              <span style={runeStyles}>🔥</span>
              <span style={runeStyles}>💧</span>
              <span style={runeStyles}>🌍</span>
              <span style={runeStyles}>💨</span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section style={updatesContainerStyles}>
        <div style={sectionHeaderStyles}>
          <h2 style={sectionTitleStyles}>🚀 Recent Discoveries</h2>
          <p style={sectionDescStyles}>
            Latest enhancements to your collecting experience
          </p>
        </div>

        <div style={updatesGridStyles}>
          <div style={updateCardStyles}>
            <div style={updateBadgeStyles}>NEW</div>
            <h3 style={updateHeadingStyles}>⚡ Enhanced Battle System</h3>
            <ul style={updateListStyles}>
              <li>Advanced psychological attribute system</li>
              <li>Type advantage indicators during battle</li>
              <li>Critical hit and special attack animations</li>
              <li>Sanctum bonuses affect combat power</li>
            </ul>
          </div>

          <div style={updateCardStyles}>
            <div style={updateBadgeStyles}>IMPROVED</div>
            <h3 style={updateHeadingStyles}>🖼️ Gallery Expansion</h3>
            <ul style={updateListStyles}>
              <li>21 unique creatures with rich lore</li>
              <li>Advanced filtering by tier and type</li>
              <li>Real-time collection tracking</li>
              <li>Responsive card display system</li>
            </ul>
          </div>

          <div style={updateCardStyles}>
            <div style={updateBadgeStyles}>ENHANCED</div>
            <h3 style={updateHeadingStyles}>🏛️ Sanctum Evolution</h3>
            <ul style={updateListStyles}>
              <li>Three-tier progression system</li>
              <li>Prestige value calculations</li>
              <li>Evolution bonus multipliers</li>
              <li>Collection organization tools</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Styles
const heroSectionStyles = {
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #000000 100%)'
};

const heroBackgroundStyles = {
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

const heroOverlayStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(45deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)'
};

const heroContentStyles = {
  position: 'relative',
  zIndex: 2,
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  gap: '60px'
};

const heroTextContainerStyles = {
  color: '#fff'
};

const heroTitleStyles = {
  margin: '0 0 30px 0',
  lineHeight: '1.1'
};

const titleLineStyles = {
  display: 'block',
  fontSize: '1.2rem',
  fontWeight: '500',
  color: '#ffd700',
  marginBottom: '10px',
  letterSpacing: '2px'
};

const titleMainStyles = {
  display: 'block',
  fontSize: '4rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4, #45b7d1)',
  backgroundSize: '400% 400%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'dragonGradient 4s ease-in-out infinite',
  textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
  marginBottom: '10px'
};

const titleSubStyles = {
  display: 'block',
  fontSize: '1.1rem',
  fontWeight: '400',
  color: '#b8c5d1',
  letterSpacing: '1px'
};

const heroDescStyles = {
  fontSize: '1.3rem',
  lineHeight: '1.7',
  color: '#e8e8e8',
  marginBottom: '40px',
  maxWidth: '500px'
};

const heroButtonsStyles = {
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap'
};

const primaryButtonStyles = {
  background: 'linear-gradient(45deg, #ff6b6b, #ff8787)',
  color: '#fff',
  textDecoration: 'none',
  padding: '15px 30px',
  borderRadius: '30px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  border: '2px solid #ff6b6b',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
  textAlign: 'center'
};

const secondaryButtonStyles = {
  background: 'transparent',
  color: '#ffd700',
  textDecoration: 'none',
  padding: '15px 30px',
  borderRadius: '30px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  border: '2px solid #ffd700',
  transition: 'all 0.3s ease',
  textAlign: 'center'
};

const tertiaryButtonStyles = {
  background: 'linear-gradient(45deg, #8b4513, #a0522d)',
  color: '#fff',
  textDecoration: 'none',
  padding: '15px 30px',
  borderRadius: '30px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  border: '2px solid #8b4513',
  transition: 'all 0.3s ease',
  textAlign: 'center'
};

const heroImageContainerStyles = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '400px'
};

const samuraiSilhouetteStyles = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  fontSize: '4rem',
  color: '#ff6b6b',
  textShadow: '0 0 30px rgba(255, 107, 107, 0.8)',
  animation: 'samuraiGlow 3s ease-in-out infinite alternate',
  zIndex: 3
};

const dragonSilhouetteStyles = {
  fontSize: '16rem',
  color: '#ffd700',
  textShadow: '0 0 50px rgba(255, 215, 0, 0.8)',
  animation: 'dragonFloat 6s ease-in-out infinite',
  zIndex: 2
};

const mysticalGlowStyles = {
  position: 'absolute',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, rgba(255, 107, 107, 0.1) 50%, transparent 100%)',
  animation: 'mysticalPulse 4s ease-in-out infinite',
  zIndex: 1
};

const featuresContainerStyles = {
  padding: '100px 20px',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
};

const sectionHeaderStyles = {
  textAlign: 'center',
  marginBottom: '60px'
};

const sectionTitleStyles = {
  fontSize: '3rem',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  background: 'linear-gradient(45deg, #2c3e50, #34495e)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
};

const sectionDescStyles = {
  fontSize: '1.2rem',
  color: '#6c757d',
  maxWidth: '600px',
  margin: '0 auto'
};

const featuresGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '40px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const featureCardStyles = {
  background: '#fff',
  padding: '40px 30px',
  borderRadius: '20px',
  textAlign: 'center',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  border: '3px solid transparent',
  transition: 'all 0.3s ease'
};

const featureIconStyles = {
  fontSize: '4rem',
  marginBottom: '20px',
  display: 'block'
};

const featureHeadingStyles = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
  color: '#2c3e50'
};

const featureTextStyles = {
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#6c757d',
  marginBottom: '20px'
};

const featureStatsStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  flexWrap: 'wrap'
};

const statBadgeStyles = {
  background: 'linear-gradient(45deg, #007bff, #0056b3)',
  color: '#fff',
  padding: '5px 12px',
  borderRadius: '15px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const loreContainerStyles = {
  position: 'relative',
  padding: '100px 20px',
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  color: '#fff',
  overflow: 'hidden'
};

const loreBackgroundStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    radial-gradient(circle at 30% 70%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 69, 0, 0.05) 0%, transparent 50%)
  `,
  animation: 'loreGlow 10s ease-in-out infinite alternate'
};

const loreContentStyles = {
  position: 'relative',
  zIndex: 2,
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '60px',
  alignItems: 'center'
};

const loreTextSectionStyles = {
  maxWidth: '700px'
};

const loreTitleStyles = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  margin: '0 0 30px 0',
  color: '#ffd700'
};

const loreQuoteStyles = {
  borderLeft: '4px solid #ffd700',
  paddingLeft: '30px',
  marginBottom: '40px'
};

const loreTextStyles = {
  fontSize: '1.1rem',
  lineHeight: '1.8',
  marginBottom: '20px',
  color: '#e8e8e8',
  fontStyle: 'italic'
};

const loreCallToActionStyles = {
  textAlign: 'center',
  padding: '30px',
  background: 'rgba(255, 215, 0, 0.1)',
  borderRadius: '15px',
  border: '2px solid rgba(255, 215, 0, 0.3)'
};

const ctaTitleStyles = {
  fontSize: '1.3rem',
  margin: '0 0 20px 0',
  color: '#ffd700'
};

const ctaButtonStyles = {
  background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
  color: '#000',
  textDecoration: 'none',
  padding: '15px 30px',
  borderRadius: '25px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)'
};

const loreVisualStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '30px'
};

const mysticalSymbolStyles = {
  fontSize: '8rem',
  color: '#ffd700',
  textShadow: '0 0 40px rgba(255, 215, 0, 0.8)',
  animation: 'symbolRotate 20s linear infinite'
};

const runesContainerStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px'
};

const runeStyles = {
  fontSize: '3rem',
  textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
  animation: 'runeGlow 3s ease-in-out infinite alternate'
};

const updatesContainerStyles = {
  padding: '100px 20px',
  background: 'linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%)'
};

const updatesGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '30px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const updateCardStyles = {
  position: 'relative',
  background: '#fff',
  padding: '30px',
  borderRadius: '15px',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  border: '2px solid #e9ecef'
};

const updateBadgeStyles = {
  position: 'absolute',
  top: '-10px',
  right: '20px',
  background: 'linear-gradient(45deg, #28a745, #34ce57)',
  color: '#fff',
  padding: '5px 15px',
  borderRadius: '15px',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
};

const updateHeadingStyles = {
  fontSize: '1.3rem',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
  color: '#2c3e50'
};

const updateListStyles = {
  listStyle: 'none',
  padding: 0,
  margin: 0
};

// Add CSS animations
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes dragonGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes dragonFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    
    @keyframes mysticalGlow {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.1); }
    }
    
    @keyframes mysticalPulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.2); opacity: 0.8; }
    }
    
    @keyframes symbolRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes runeGlow {
      0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
      100% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.8); }
    }
    
    @keyframes loreGlow {
      0% { opacity: 0.3; }
      100% { opacity: 0.6; }
    }
    
    @keyframes samuraiGlow {
      0% { 
        text-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
        transform: rotate(-2deg);
      }
      100% { 
        text-shadow: 0 0 40px rgba(255, 107, 107, 1);
        transform: rotate(2deg);
      }
    }
    
    /* Hover Effects */
    .page-container a:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2) !important;
    }
    
    .feature-card:hover {
      transform: translateY(-5px) !important;
      border-color: #ffd700 !important;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15) !important;
    }
    
    /* Responsive Design */
    @media (max-width: 968px) {
      .hero-content {
        grid-template-columns: 1fr !important;
        text-align: center !important;
        gap: 40px !important;
      }
      
      .lore-content {
        grid-template-columns: 1fr !important;
        text-align: center !important;
        gap: 40px !important;
      }
      
      .title-main {
        font-size: 3rem !important;
      }
      
      .dragon-silhouette {
        font-size: 12rem !important;
      }
    }
    
    @media (max-width: 768px) {
      .hero-buttons {
        flex-direction: column !important;
        align-items: center !important;
      }
      
      .hero-buttons a {
        width: 100% !important;
        max-width: 300px !important;
      }
      
      .features-grid {
        grid-template-columns: 1fr !important;
      }
      
      .updates-grid {
        grid-template-columns: 1fr !important;
      }
      
      .title-main {
        font-size: 2.5rem !important;
      }
    }
    
    /* Additional Interactive Elements */
    .update-card li {
      position: relative;
      padding: 8px 0 8px 20px;
      color: #6c757d;
    }
    
    .update-card li::before {
      content: '⚡';
      position: absolute;
      left: 0;
      color: #ffd700;
    }
  `;
  document.head.appendChild(style);
}

export default Home;