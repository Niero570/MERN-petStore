import React, { useState, useEffect } from 'react';
import './battle-arena.css';

const BattleArenaSimple = () => {
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

  useEffect(() => {
    console.log('BattleArenaSimple: useEffect triggered');
    console.log('demoCreatures:', demoCreatures);
    
    try {
      setLoading(true);
      setError(null);
      console.log('Setting creatures...');
      setCreatures(demoCreatures);
      setLoading(false);
      console.log('Loading complete');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  console.log('BattleArenaSimple render - loading:', loading, 'error:', error, 'creatures:', creatures.length);

  if (error) {
    return (
      <div className="sanctum-arena">
        <div className="error-state">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="sanctum-arena">
        <div className="loading-state">
          <h2>⚔️ Loading...</h2>
          <div className="loading-spinner">🔄</div>
        </div>
      </div>
    );
  }

  return (
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
  );
};

export default BattleArenaSimple;