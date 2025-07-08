import React, { useState, useEffect } from 'react';
import { useAuth } from '../content/authContent';
import Footer from './Footer';
import './battle-arena.css';

const BattleArenaSimple = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creatures, setCreatures] = useState([]);

  // Simple demo creatures
  const demoCreatures = [
    {
      _id: '1',
      name: 'Test Creature 1',
      hp: 100,
      attack: 50,
      type: 'Fire',
      tier: 'Protector',
      image: '/images/proChimp.png'
    },
    {
      _id: '2',
      name: 'Test Creature 2',
      hp: 120,
      attack: 60,
      type: 'Water',
      tier: 'Protector',
      image: '/images/proPolar.jpeg'
    }
  ];

  // Fetch real creatures from API
  const fetchUserPets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/pets/battle', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const pets = await response.json();
      
      if (!pets || pets.length === 0) {
        setCreatures(demoCreatures);
      } else {
        setCreatures(pets);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching creatures:', err);
      setCreatures(demoCreatures);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserPets();
    } else {
      setCreatures(demoCreatures);
      setLoading(false);
    }
  }, [token]);

  if (error) {
    return (
      <div className="page-container">
        <div className="sanctum-arena">
          <div className="error-state">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="sanctum-arena">
          <div className="loading-state">
          <h2>⚔️ Loading...</h2>
          <div className="loading-spinner">🔄</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="sanctum-arena">
      <header className="header">
        <h1>⚔️ SIMPLE BATTLE ARENA ⚔️</h1>
      </header>
      <main className="main-content">
        <div className="battle-stage">
          <h2>Creatures Loaded: {creatures.length}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
            {creatures.map(creature => (
              <div key={creature._id} style={{ background: '#333', padding: '20px', borderRadius: '10px', color: 'white' }}>
                <img src={creature.image} alt={creature.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <h3>{creature.name}</h3>
                <p>HP: {creature.hp}</p>
                <p>Attack: {creature.attack}</p>
                <p>Type: {creature.type}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      </div>
      <Footer />
    </div>
  );
};

export default BattleArenaSimple;