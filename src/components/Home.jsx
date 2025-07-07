import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>🐾 BUSHIDO CODER dTCG 🎴</h1>
        <p>
          Enter the ultimate digital trading card game experience where legendary creatures 
          battle in epic sanctums. Collect, evolve, and dominate in the most immersive 
          pet battle arena ever created.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/battle" className="btn-primary">
            ⚔️ Enter Battle Arena
          </Link>
          <Link to="/sanctum" className="btn-secondary">
            🏛️ Visit Sanctum
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="number">25+</div>
          <div className="label">Legendary Creatures</div>
        </div>
        <div className="stat-card">
          <div className="number">6</div>
          <div className="label">Sanctum Tiers</div>
        </div>
        <div className="stat-card">
          <div className="number">4</div>
          <div className="label">Element Types</div>
        </div>
        <div className="stat-card">
          <div className="number">∞</div>
          <div className="label">Epic Battles</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="feature-grid">
        <div className="feature-card">
          <div className="icon">⚔️</div>
          <h3>Epic Battle System</h3>
          <p>
            Engage in strategic turn-based combat with type advantages, 
            special abilities, and stunning visual effects. Every battle 
            is a cinematic experience.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🧬</div>
          <h3>Evolution Mechanics</h3>
          <p>
            Watch your creatures evolve from Protectors to mighty Dissonants. 
            Each evolution unlocks devastating new powers and abilities.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🏛️</div>
          <h3>Sanctum Collection</h3>
          <p>
            Build your personal Sanctum and showcase your legendary creatures. 
            Manage your collection and track your battle victories.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">💎</div>
          <h3>Rare Creatures</h3>
          <p>
            Discover creatures of mythical rarity - from Common Forest Chimps 
            to Legendary Phoenix Lords that command cosmic flames.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🌟</div>
          <h3>Prestige System</h3>
          <p>
            Earn prestige points through victories and evolution bonuses. 
            Climb the ranks from Alpha to Apex Sanctum status.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🎯</div>
          <h3>Strategic Depth</h3>
          <p>
            Master the elemental triangle: Fire burns Earth, Earth grounds Air, 
            Air extinguishes Water, and Water douses Fire.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <div className="card">
        <h2>🚀 Ready to Begin Your Journey?</h2>
        <p>
          Join thousands of trainers in the most advanced digital trading card game. 
          Your legendary creatures await in the Sanctum, and epic battles beckon 
          in the arena. Will you rise to become an Apex Champion?
        </p>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link to="/battle" className="btn-primary">
            Start Your Legend Now
          </Link>
        </div>
      </div>

      {/* Latest Updates */}
      <div className="card">
        <h2>📰 Latest Updates</h2>
        <div style={{ textAlign: 'left' }}>
          <h3>🔥 Version 2.0 - Battle Arena Enhancement</h3>
          <p>
            • Enhanced battle timing system with dramatic effects<br/>
            • Real creature images for immersive gameplay<br/>
            • Victory celebrations and special attack animations<br/>
            • Improved responsive design for all devices
          </p>
          
          <h3>⚡ New Features</h3>
          <p>
            • Type advantage indicators during battle<br/>
            • Critical hit and special attack visual feedback<br/>
            • Enhanced health bar animations<br/>
            • Professional error handling and loading states
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;