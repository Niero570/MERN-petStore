import React, { useState, useEffect } from 'react';
import { useAuth } from '../content/authContent';

function Dashboard() {
  const { user, token } = useAuth();
  const [userPets, setUserPets] = useState([]);
  const [sanctumInfo, setSanctumInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user's sanctum info
      const response = await fetch('/api/auth/sanctum', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSanctumInfo(data.sanctum);
        setUserPets(data.sanctum.collection.creatures);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading your data...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to your Dashboard, {user?.username}!</h1>
        <div className="user-stats">
          <div className="stat-card">
            <h3>Currency</h3>
            <p>{user?.currency} coins</p>
          </div>
          <div className="stat-card">
            <h3>Total Battles</h3>
            <p>{user?.totalBattles}</p>
          </div>
          <div className="stat-card">
            <h3>Battles Won</h3>
            <p>{user?.battlesWon}</p>
          </div>
        </div>
      </div>

      {sanctumInfo && (
        <div className="sanctum-summary">
          <h2>{sanctumInfo.tier}</h2>
          <p>Title: {sanctumInfo.title}</p>
          <p>Total Creatures: {sanctumInfo.stats.totalCreatures}</p>
          <p>Total Prestige: {sanctumInfo.stats.totalPrestige}</p>
          <div className="quick-actions">
            <button onClick={() => window.location.href = '/sanctum'}>
              View Full Sanctum
            </button>
            <button onClick={() => window.location.href = '/battle'}>
              Start Battle
            </button>
          </div>
        </div>
      )}

      <div className="recent-pets">
        <h3>Your Recent Creatures</h3>
        <div className="pets-grid">
          {userPets.slice(0, 6).map((pet, index) => (
            <div key={index} className="pet-card">
              <h4>{pet.identity.name}</h4>
              <p>{pet.identity.species} - {pet.identity.tier}</p>
              <p>Type: {pet.identity.type}</p>
              <p>Prestige: {pet.meta.prestigeValue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;