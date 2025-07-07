import React from 'react';

const BattleArenaTest = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#fff',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#ffd700',
        fontSize: '2.5rem',
        marginBottom: '30px'
      }}>
        ⚔️ SANCTUM BATTLE ARENA ⚔️
      </h1>
      
      <div style={{
        textAlign: 'center',
        fontSize: '1.2rem',
        marginBottom: '30px'
      }}>
        <p>Battle Arena Test Component</p>
        <p>This is a simplified version to test basic rendering.</p>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          backgroundColor: '#1a1a2e',
          border: '2px solid #444',
          borderRadius: '10px',
          padding: '20px',
          width: '300px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#ffd700', marginBottom: '10px' }}>Creature 1</h3>
          <p>Test creature placeholder</p>
        </div>
        
        <div style={{
          fontSize: '2rem',
          alignSelf: 'center',
          color: '#ffd700'
        }}>
          VS
        </div>
        
        <div style={{
          backgroundColor: '#1a1a2e',
          border: '2px solid #444',
          borderRadius: '10px',
          padding: '20px',
          width: '300px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#ffd700', marginBottom: '10px' }}>Creature 2</h3>
          <p>Test creature placeholder</p>
        </div>
      </div>
      
      <div style={{
        textAlign: 'center',
        marginTop: '30px'
      }}>
        <button style={{
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          fontSize: '1.1rem',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Test Battle Button
        </button>
      </div>
    </div>
  );
};

export default BattleArenaTest;