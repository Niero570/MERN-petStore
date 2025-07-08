import React, { useState, useEffect } from 'react';
import { useAuth } from '../content/authContent';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [userPets, setUserPets] = useState([]);
  const [sanctumInfo, setSanctumInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  },  [user]);

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
    <div className={styles.mainContainer}>
      <div className={styles.dashboardHeader}>
        <h1>Welcome to your Dashboard, {user?.username}!</h1>
        <div className={styles.userStats}>
          <div className={styles.statCard}>
            <h3>Currency</h3>
            <p>{user?.currency} coins</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Battles</h3>
            <p>{user?.totalBattles}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Battles Won</h3>
            <p>{user?.battlesWon}</p>
          </div>
        </div>
      </div>

      {sanctumInfo && (
        <div className={styles.sanctumSummary}>
          <h2>{sanctumInfo.tier}</h2>
          <p>Title: {sanctumInfo.title}</p>
          <p>Total Creatures: {sanctumInfo.stats.totalCreatures}</p>
          <p>Total Prestige: {sanctumInfo.stats.totalPrestige}</p>
          <div className={styles.quickActions}>
            <button onClick={() => navigate('/sanctum')}>
              View Full Sanctum
            </button>
            <button onClick={() => navigate('/battle')}>
              Start Battle
            </button>
          </div>
        </div>
      )}

      <div className={styles.recentPets}>
        <h3>Your Recent Creatures</h3>
        <div className={styles.petsGrid}>
          {userPets.slice(0, 6).map((pet, index) => (
            <div key={index} className={styles.petCard}>
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