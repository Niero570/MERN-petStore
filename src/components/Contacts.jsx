import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>📬 Contact Bushido Coder</h1>
        <p>
          Have questions about the dTCG system? Need technical support? 
          Want to discuss collaboration opportunities? We'd love to hear from you!
        </p>
      </section>

      {/* Contact Options */}
      <div className="feature-grid">
        <div className="feature-card">
          <div className="icon">💬</div>
          <h3>General Inquiries</h3>
          <p>
            Questions about the game mechanics, creature evolutions, 
            or general feedback about your experience.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🔧</div>
          <h3>Technical Support</h3>
          <p>
            Experiencing issues with battles, login problems, 
            or need help with Sanctum management.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🤝</div>
          <h3>Collaboration</h3>
          <p>
            Interested in contributing to the project, business partnerships, 
            or developer collaboration opportunities.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🎨</div>
          <h3>Creative Feedback</h3>
          <p>
            Suggestions for new creatures, game features, 
            UI improvements, or balance adjustments.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="form-container">
        <h2>🚀 Send Us a Message</h2>
        {submitted ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            background: 'rgba(46, 204, 113, 0.1)',
            borderRadius: '10px',
            border: '2px solid var(--success-green)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✅</div>
            <h3 style={{ color: 'var(--success-green)', marginBottom: '15px' }}>
              Message Sent Successfully!
            </h3>
            <p>
              Thank you for reaching out! We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us more about your inquiry, feedback, or ideas..."
                rows="6"
              />
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button type="submit" className="btn-primary">
                🚀 Send Message
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Quick Links */}
      <div className="card">
        <h2>🔗 Quick Links</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">📚</div>
            <h3>Documentation</h3>
            <p>
              Learn about game mechanics, creature types, 
              and battle strategies in our comprehensive guide.
            </p>
            <Link to="/about" className="btn-secondary" style={{ marginTop: '15px' }}>
              Read More
            </Link>
          </div>

          <div className="feature-card">
            <div className="icon">⚔️</div>
            <h3>Battle Arena</h3>
            <p>
              Jump straight into epic battles and experience 
              the core gameplay mechanics firsthand.
            </p>
            <Link to="/battle" className="btn-primary" style={{ marginTop: '15px' }}>
              Start Battling
            </Link>
          </div>

          <div className="feature-card">
            <div className="icon">🏛️</div>
            <h3>Your Sanctum</h3>
            <p>
              Manage your creature collection, track statistics, 
              and monitor your progression through the ranks.
            </p>
            <Link to="/sanctum" className="btn-secondary" style={{ marginTop: '15px' }}>
              Visit Sanctum
            </Link>
          </div>
        </div>
      </div>

      {/* Developer Info */}
      <div className="card">
        <h2>👨‍💻 About the Developer</h2>
        <p>
          This project was created as a capstone demonstration of full-stack 
          web development skills using the MERN stack. It showcases expertise in:
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div>
            <h3>🎯 Frontend Development</h3>
            <p>
              • React.js with modern hooks<br/>
              • Responsive CSS design<br/>
              • Component architecture<br/>
              • State management<br/>
              • User experience optimization
            </p>
          </div>
          <div>
            <h3>⚙️ Backend Development</h3>
            <p>
              • Node.js & Express.js<br/>
              • RESTful API design<br/>
              • Database modeling<br/>
              • Authentication systems<br/>
              • Error handling & validation
            </p>
          </div>
          <div>
            <h3>🗄️ Database Management</h3>
            <p>
              • MongoDB integration<br/>
              • Data modeling & relationships<br/>
              • Query optimization<br/>
              • Migration strategies<br/>
              • Performance monitoring
            </p>
          </div>
          <div>
            <h3>🚀 Project Management</h3>
            <p>
              • Agile development practices<br/>
              • Version control with Git<br/>
              • Testing & debugging<br/>
              • Deployment strategies<br/>
              • Documentation & maintenance
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            Interested in discussing development opportunities or technical collaborations?
          </p>
          <div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-primary"
            >
              📬 Get In Touch
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacts;