import React from 'react';
import { Link } from 'react-router-dom';

const TestNavigation = () => {
  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: '#fff',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h2>Test Navigation</h2>
      <div style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '20px'
      }}>
        <Link 
          to="/battle" 
          style={{
            backgroundColor: '#ff6b6b',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Battle Arena (Fixed)
        </Link>
        <Link 
          to="/battle-test" 
          style={{
            backgroundColor: '#4ecdc4',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Battle Arena (Test)
        </Link>
      </div>
    </div>
  );
};

export default TestNavigation;