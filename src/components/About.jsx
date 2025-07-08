import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const About = () => {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>📖 About Bushido Coder dTCG</h1>
        <p>
          Discover the story behind the ultimate digital trading card game 
          that brings legendary creatures to life through epic battles and evolution.
        </p>
      </section>

      {/* Project Overview */}
      <div className="card">
        <h2>🎯 Project Overview</h2>
        <p>
          Bushido Coder dTCG is a full-stack MERN (MongoDB, Express, React, Node.js) 
          application that reimagines the trading card game experience for the digital age. 
          This capstone project showcases advanced web development skills through an 
          immersive pet battle arena with real-time combat mechanics.
        </p>
        <p>
          Built with modern technologies and professional-grade architecture, this project 
          demonstrates expertise in responsive design, state management, database integration, 
          and user experience optimization.
        </p>
      </div>

      {/* Technical Features */}
      <div className="card">
        <h2>⚙️ Technical Architecture</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">⚛️</div>
            <h3>React Frontend</h3>
            <p>
              Modern React with hooks, routing, and component-based architecture. 
              Responsive design with CSS Grid and Flexbox for optimal user experience.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🗄️</div>
            <h3>MongoDB Database</h3>
            <p>
              NoSQL database storing creature data, user collections, battle history, 
              and Sanctum configurations with optimized queries.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🚀</div>
            <h3>Express.js API</h3>
            <p>
              RESTful API endpoints for creature management, battle logic, 
              authentication, and image serving with proper error handling.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🔧</div>
            <h3>Node.js Backend</h3>
            <p>
              Server-side logic handling battle calculations, database operations, 
              and real-time state management for seamless gameplay.
            </p>
          </div>
        </div>
      </div>

      {/* Game Design Philosophy */}
      <div className="card">
        <h2>🎨 Game Design Philosophy</h2>
        <p>
          Our design philosophy centers on creating an engaging, balanced, and visually 
          stunning experience that honors classic TCG mechanics while embracing modern 
          digital possibilities.
        </p>
        
        <h3>🔥 Elemental Balance System</h3>
        <p>
          The game features a sophisticated type advantage system where Fire, Water, 
          Air, and Earth elements interact in strategic ways. This creates depth 
          in deck building and tactical decision-making during battles.
        </p>

        <h3>🧬 Evolution Mechanics</h3>
        <p>
          Creatures evolve through tiers - from humble Protectors to mighty Dissonants, 
          each with unique abilities and increased power. This progression system 
          keeps players engaged and provides long-term goals.
        </p>

        <h3>🏛️ Sanctum Prestige</h3>
        <p>
          The Sanctum system allows players to build their collections, track statistics, 
          and showcase their most prized creatures. Prestige points create a meaningful 
          progression system beyond individual battles.
        </p>
      </div>

      {/* Development Journey */}
      <div className="card">
        <h2>🛠️ Development Journey</h2>
        <p>
          This project represents months of careful planning, iterative development, 
          and continuous refinement. Key milestones include:
        </p>

        <h3>Phase 1: Foundation</h3>
        <p>
          • Database schema design and creature data modeling<br/>
          • Basic CRUD operations and API development<br/>
          • React component architecture planning<br/>
          • Authentication and user management systems
        </p>

        <h3>Phase 2: Core Gameplay</h3>
        <p>
          • Battle system implementation with turn-based mechanics<br/>
          • Type advantage calculations and damage formulas<br/>
          • Creature selection and Sanctum management<br/>
          • Real-time state updates and error handling
        </p>

        <h3>Phase 3: Polish & Enhancement</h3>
        <p>
          • Visual effects and animation systems<br/>
          • Responsive design across all device sizes<br/>
          • Professional UI/UX improvements<br/>
          • Performance optimization and bug fixes
        </p>
      </div>

      {/* Technology Stack */}
      <div className="card">
        <h2>🔬 Technology Stack</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <h3>Frontend Technologies</h3>
            <p>
              • React 18 with Hooks<br/>
              • React Router for navigation<br/>
              • CSS3 with Grid & Flexbox<br/>
              • Vite for build optimization<br/>
              • Responsive design principles
            </p>
          </div>
          <div>
            <h3>Backend Technologies</h3>
            <p>
              • Node.js runtime<br/>
              • Express.js framework<br/>
              • MongoDB with Mongoose<br/>
              • RESTful API design<br/>
              • JWT authentication
            </p>
          </div>
          <div>
            <h3>Development Tools</h3>
            <p>
              • Git version control<br/>
              • ESLint for code quality<br/>
              • Postman for API testing<br/>
              • MongoDB Compass<br/>
              • Chrome DevTools
            </p>
          </div>
          <div>
            <h3>Deployment & Hosting</h3>
            <p>
              • Production-ready architecture<br/>
              • Environment configuration<br/>
              • Static asset optimization<br/>
              • Database connection pooling<br/>
              • Error monitoring
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card">
        <h2>🎮 Experience the Magic</h2>
        <p>
          Ready to see the culmination of modern web development and creative game design? 
          Dive into the Battle Arena and experience firsthand the technical excellence 
          and engaging gameplay that makes this project special.
        </p>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link to="/battle" className="btn-primary">
            ⚔️ Enter Battle Arena
          </Link>
          <Link to="/sanctum" className="btn-secondary" style={{ marginLeft: '20px' }}>
            🏛️ Visit Sanctum
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;