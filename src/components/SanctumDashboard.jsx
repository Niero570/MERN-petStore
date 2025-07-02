import React, { useState, useEffect } from 'react';
import CreatureCard from './CreatureCard';

function SanctumDashboard({ token }) {
  const [sanctumData, setSanctumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getSanctum = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/sanctum', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          setSanctumData(data.sanctum); // Our backend returns data.sanctum
        } else {
          setError(data.error || 'Failed to load Sanctum');
        }
        setLoading(false);
      } catch (error) {
        console.log("Error fetching sanctum:", error);
        setError('Network error loading Sanctum');
        setLoading(false);
      }
    };

    if (token) {
      getSanctum();
    }
  }, [token]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading your Sanctum...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!sanctumData) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>No Sanctum data available.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Sanctum Header */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 'bold' }}>
          {sanctumData.tier}
        </h1>
        <p style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#666' }}>
          {sanctumData.title} • {sanctumData.user.username}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Collection</h3>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
              {sanctumData.stats.totalCreatures}/{sanctumData.stats.capacity}
            </p>
          </div>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Total Prestige</h3>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
              {sanctumData.stats.totalPrestige.toLocaleString()}
            </p>
          </div>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Evolution Bonus</h3>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
              +{Math.round((sanctumData.stats.evolutionBonus - 1) * 100)}%
            </p>
          </div>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Currency</h3>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6' }}>
              {sanctumData.user.currency} coins
            </p>
          </div>
        </div>
      </div>

      {/* Creatures Collection */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 'bold' }}>
          Your Creatures ({sanctumData.collection.creatures.length})
        </h2>
        
        {sanctumData.collection.creatures.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No creatures in your Sanctum yet. Visit the catalog to start collecting!
          </p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            {sanctumData.collection.creatures.map((creature) => (
              <CreatureCard 
                key={creature.userPetId} 
                creature={creature} 
                sanctumTier={sanctumData.tier}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SanctumDashboard;