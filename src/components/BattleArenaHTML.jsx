import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../content/authContent';
import Footer from './Footer';

const BattleArenaHTML = () => {
  const { token } = useAuth();
  
  // State management
  const [userPets, setUserPets] = useState([]);
  const [selectedPet1, setSelectedPet1] = useState(null);
  const [selectedPet2, setSelectedPet2] = useState(null);
  const [battleActive, setBattleActive] = useState(false);
  const [battleLog, setBattleLog] = useState(['Click "Start Battle!" to begin...']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const battleLogRef = useRef(null);
  const battleIntervalRef = useRef(null);

  // Initialize pets
  useEffect(() => {
    fetchUserPets();
  }, [token]);

  // Auto-scroll battle log
  useEffect(() => {
    if (battleLogRef.current) {
      battleLogRef.current.scrollTop = battleLogRef.current.scrollHeight;
    }
  }, [battleLog]);

  const fetchUserPets = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/sanctum', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.sanctum && data.sanctum.collection && data.sanctum.collection.creatures) {
          setUserPets(data.sanctum.collection.creatures);
        }
      } else {
        setError('Failed to load your creatures');
      }
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Network error loading creatures');
    } finally {
      setLoading(false);
    }
  };

  const addToBattleLog = (message) => {
    setBattleLog(prev => [...prev, message]);
  };

  const normalAttack = (attacker, defender) => {
    const baseAttack = attacker.attributes?.totalPower || attacker.attack || 50;
    const damage = Math.floor(baseAttack * 0.3 * (0.8 + Math.random() * 0.4));
    const newHp = Math.max(0, defender.currentHp - damage);
    
    if (defender === selectedPet1) {
      setSelectedPet1(prev => ({ ...prev, currentHp: newHp }));
    } else {
      setSelectedPet2(prev => ({ ...prev, currentHp: newHp }));
    }
    
    return `${attacker.identity?.name || attacker.name} attacks for ${damage} damage!`;
  };

  const useSpecial = (attacker, defender) => {
    const baseSpecial = attacker.battleStats?.specialDamage || attacker.specialDamage || 70;
    const damage = Math.floor(baseSpecial * (0.8 + Math.random() * 0.4));
    const newHp = Math.max(0, defender.currentHp - damage);
    
    if (defender === selectedPet1) {
      setSelectedPet1(prev => ({ ...prev, currentHp: newHp }));
    } else {
      setSelectedPet2(prev => ({ ...prev, currentHp: newHp }));
    }
    
    const specialName = attacker.battleStats?.special || attacker.special || 'Special Attack';
    return `✨ ${attacker.identity?.name || attacker.name} uses ${specialName} for ${damage} damage!`;
  };

  const getHealthColor = (currentHp, maxHp) => {
    const percent = (currentHp / maxHp) * 100;
    if (percent > 60) return "#4CAF50"; // Green
    if (percent > 30) return "#FFC107"; // Yellow
    return "#F44336"; // Red
  };

  const startBattle = () => {
    if (!selectedPet1 || !selectedPet2) {
      setError('Please select two creatures to battle');
      return;
    }

    // Reset battle state
    setBattleLog(['⚔️ Battle started! ⚔️']);
    setBattleActive(true);
    setError(null);
    
    // Reset HP to max
    const maxHp1 = selectedPet1.battleStats?.hp || selectedPet1.hp || 100;
    const maxHp2 = selectedPet2.battleStats?.hp || selectedPet2.hp || 100;
    
    setSelectedPet1(prev => ({ ...prev, currentHp: maxHp1, maxHp: maxHp1 }));
    setSelectedPet2(prev => ({ ...prev, currentHp: maxHp2, maxHp: maxHp2 }));

    // Battle loop
    let turn = 0;
    const maxTurns = 20;
    
    battleIntervalRef.current = setInterval(() => {
      turn++;
      addToBattleLog(`--- Turn ${turn} ---`);
      
      // Pet 1 attacks
      const attack1 = Math.random() < 0.3 ? 
        useSpecial(selectedPet1, selectedPet2) : 
        normalAttack(selectedPet1, selectedPet2);
      addToBattleLog(attack1);
      
      // Check if Pet 2 is defeated
      setTimeout(() => {
        setSelectedPet2(current => {
          if (current.currentHp <= 0) {
            endBattle(selectedPet1, current);
            return current;
          }
          
          // Pet 2 attacks
          const attack2 = Math.random() < 0.3 ? 
            useSpecial(current, selectedPet1) : 
            normalAttack(current, selectedPet1);
          addToBattleLog(attack2);
          
          // Check if Pet 1 is defeated
          setTimeout(() => {
            setSelectedPet1(currentPet1 => {
              if (currentPet1.currentHp <= 0) {
                endBattle(current, currentPet1);
                return currentPet1;
              }
              return currentPet1;
            });
          }, 500);
          
          return current;
        });
      }, 500);
      
      // Check max turns
      if (turn >= maxTurns) {
        endBattle(null, null); // Draw
      }
    }, 2000); // 2 seconds per turn
  };

  const endBattle = (winner, loser) => {
    clearInterval(battleIntervalRef.current);
    setBattleActive(false);
    
    if (winner && loser) {
      addToBattleLog(`🎉 ${winner.identity?.name || winner.name} defeats ${loser.identity?.name || loser.name}!`);
    } else {
      addToBattleLog('🏳️ The battle ended in a draw!');
    }
  };

  const resetBattle = () => {
    clearInterval(battleIntervalRef.current);
    setBattleActive(false);
    setBattleLog(['Click "Start Battle!" to begin...']);
    setSelectedPet1(null);
    setSelectedPet2(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="page-container">
        <div style={containerStyles}>
          <div style={loadingStyles}>
            <h2>⚔️ Loading Battle Arena...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (userPets.length === 0) {
    return (
      <div className="page-container">
        <div style={containerStyles}>
          <div style={errorContainerStyles}>
            <h2>⚠️ No Creatures Available</h2>
            <p>You need creatures to battle! Visit the gallery to collect some.</p>
            <a href="/gallery" style={linkStyles}>🎯 Begin Hunt</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={containerStyles}>
        <h1 style={titleStyles}>⚔️ Battle Arena</h1>
        
        {error && (
          <div style={errorStyles}>
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* Pet Selection */}
        {(!selectedPet1 || !selectedPet2) && (
          <div style={selectionStyles}>
            <h2 style={sectionTitleStyles}>Choose Your Fighters</h2>
            <div style={petGridStyles}>
              {userPets.map((pet, index) => {
                const isSelected = selectedPet1?.id === pet.id || selectedPet2?.id === pet.id;
                return (
                  <div 
                    key={pet.id || index}
                    style={{...petSelectCardStyles, ...(isSelected ? selectedStyles : {})}}
                    onClick={() => {
                      if (isSelected) return;
                      if (!selectedPet1) {
                        setSelectedPet1({
                          ...pet,
                          currentHp: pet.battleStats?.hp || pet.hp || 100,
                          maxHp: pet.battleStats?.hp || pet.hp || 100
                        });
                      } else if (!selectedPet2) {
                        setSelectedPet2({
                          ...pet,
                          currentHp: pet.battleStats?.hp || pet.hp || 100,
                          maxHp: pet.battleStats?.hp || pet.hp || 100
                        });
                      }
                    }}
                  >
                    <img 
                      src={pet.meta?.image || '/images/placeholder.png'} 
                      alt={pet.identity?.name || 'Pet'} 
                      style={petSelectImageStyles}
                    />
                    <h3>{pet.identity?.name || 'Unknown Pet'}</h3>
                    <p>Power: {pet.attributes?.totalPower || 'Unknown'}</p>
                    {isSelected && <div style={selectedBadgeStyles}>✓ Selected</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Battle Arena */}
        {selectedPet1 && selectedPet2 && (
          <>
            <div style={battleArenaStyles}>
              {/* Pet 1 Card */}
              <div style={{
                ...petCardStyles,
                backgroundImage: `url(${selectedPet1.meta?.image || '/images/placeholder.png'})`
              }}>
                <div style={petInfoStyles}>
                  <div style={petNameStyles}>{selectedPet1.identity?.name || 'Pet 1'}</div>
                  <div style={petStatsStyles}>
                    <div style={statStyles}>
                      <span>HP:</span> 
                      <span>{selectedPet1.currentHp || selectedPet1.maxHp}</span>
                    </div>
                    <div style={healthBarStyles}>
                      <div style={{
                        ...healthFillStyles,
                        width: `${((selectedPet1.currentHp || selectedPet1.maxHp) / selectedPet1.maxHp) * 100}%`,
                        backgroundColor: getHealthColor(selectedPet1.currentHp || selectedPet1.maxHp, selectedPet1.maxHp)
                      }}></div>
                    </div>
                    <div style={statStyles}>
                      <span>Power:</span> 
                      <span>{selectedPet1.attributes?.totalPower || 'Unknown'}</span>
                    </div>
                    <div style={statStyles}>
                      <span>Special:</span> 
                      <span>{selectedPet1.battleStats?.special || 'Special Attack'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={vsStyles}>VS</div>

              {/* Pet 2 Card */}
              <div style={{
                ...petCardStyles,
                backgroundImage: `url(${selectedPet2.meta?.image || '/images/placeholder.png'})`
              }}>
                <div style={petInfoStyles}>
                  <div style={petNameStyles}>{selectedPet2.identity?.name || 'Pet 2'}</div>
                  <div style={petStatsStyles}>
                    <div style={statStyles}>
                      <span>HP:</span> 
                      <span>{selectedPet2.currentHp || selectedPet2.maxHp}</span>
                    </div>
                    <div style={healthBarStyles}>
                      <div style={{
                        ...healthFillStyles,
                        width: `${((selectedPet2.currentHp || selectedPet2.maxHp) / selectedPet2.maxHp) * 100}%`,
                        backgroundColor: getHealthColor(selectedPet2.currentHp || selectedPet2.maxHp, selectedPet2.maxHp)
                      }}></div>
                    </div>
                    <div style={statStyles}>
                      <span>Power:</span> 
                      <span>{selectedPet2.attributes?.totalPower || 'Unknown'}</span>
                    </div>
                    <div style={statStyles}>
                      <span>Special:</span> 
                      <span>{selectedPet2.battleStats?.special || 'Special Attack'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Battle Controls */}
            <div style={controlsStyles}>
              <button 
                onClick={startBattle}
                disabled={battleActive}
                style={{...battleBtnStyles, ...(battleActive ? disabledBtnStyles : {})}}
              >
                {battleActive ? 'Battle in progress...' : 'Start Battle!'}
              </button>
              
              <button 
                onClick={resetBattle}
                style={resetBtnStyles}
              >
                Reset
              </button>
            </div>

            {/* Battle Log */}
            <div style={battleLogStyles} ref={battleLogRef}>
              {battleLog.map((log, index) => (
                <p key={index} style={logEntryStyles}>
                  {log}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

// Styles (converted from CSS)
const containerStyles = {
  backgroundColor: '#111',
  fontFamily: '"IM Fell English SC", serif',
  color: '#f0e6d2',
  padding: '20px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const titleStyles = {
  fontSize: '3rem',
  textAlign: 'center',
  marginBottom: '30px',
  background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
};

const loadingStyles = {
  textAlign: 'center',
  padding: '60px 20px'
};

const errorContainerStyles = {
  textAlign: 'center',
  padding: '40px',
  background: 'rgba(255, 0, 0, 0.1)',
  borderRadius: '10px',
  border: '2px solid #ff4757'
};

const errorStyles = {
  background: 'rgba(255, 0, 0, 0.1)',
  border: '2px solid #ff4757',
  borderRadius: '8px',
  padding: '15px',
  margin: '20px 0',
  textAlign: 'center'
};

const linkStyles = {
  color: '#ffd700',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const selectionStyles = {
  marginBottom: '40px',
  width: '100%',
  maxWidth: '1200px'
};

const sectionTitleStyles = {
  fontSize: '2rem',
  textAlign: 'center',
  marginBottom: '30px',
  color: '#ffd700'
};

const petGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px'
};

const petSelectCardStyles = {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '20px',
  borderRadius: '15px',
  textAlign: 'center',
  cursor: 'pointer',
  border: '2px solid transparent',
  transition: 'all 0.3s ease'
};

const selectedStyles = {
  border: '2px solid #ffd700',
  background: 'rgba(255, 215, 0, 0.2)'
};

const petSelectImageStyles = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '10px',
  marginBottom: '10px'
};

const selectedBadgeStyles = {
  background: '#ffd700',
  color: '#000',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '0.8rem',
  marginTop: '10px'
};

const battleArenaStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  maxWidth: '900px',
  margin: '30px 0',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '20px'
};

const petCardStyles = {
  width: '300px',
  height: '400px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)'
  }
};

const petInfoStyles = {
  padding: '20px',
  position: 'relative',
  zIndex: 2,
  textAlign: 'center'
};

const petNameStyles = {
  fontSize: '1.8rem',
  marginBottom: '10px',
  color: '#fff',
  textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
};

const petStatsStyles = {
  backgroundColor: 'rgba(30, 20, 19, 0.85)',
  padding: '15px',
  borderRadius: '8px',
  backdropFilter: 'blur(2px)'
};

const statStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px'
};

const healthBarStyles = {
  height: '20px',
  backgroundColor: '#333',
  borderRadius: '10px',
  margin: '10px 0',
  overflow: 'hidden'
};

const healthFillStyles = {
  height: '100%',
  transition: 'width 0.5s ease'
};

const vsStyles = {
  fontSize: '2rem',
  padding: '0 20px',
  color: '#ff6b6b',
  fontWeight: 'bold'
};

const controlsStyles = {
  display: 'flex',
  gap: '20px',
  margin: '20px 0'
};

const battleBtnStyles = {
  backgroundColor: '#6c5ce7',
  color: 'white',
  border: 'none',
  padding: '12px 25px',
  fontSize: '1.2rem',
  borderRadius: '5px',
  cursor: 'pointer',
  fontFamily: '"IM Fell English SC", serif',
  transition: 'all 0.3s ease'
};

const disabledBtnStyles = {
  backgroundColor: '#666',
  cursor: 'not-allowed'
};

const resetBtnStyles = {
  backgroundColor: '#ff7675',
  color: 'white',
  border: 'none',
  padding: '12px 25px',
  fontSize: '1.2rem',
  borderRadius: '5px',
  cursor: 'pointer',
  fontFamily: '"IM Fell English SC", serif',
  transition: 'all 0.3s ease'
};

const battleLogStyles = {
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: 'white',
  padding: '15px',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '800px',
  minHeight: '200px',
  maxHeight: '300px',
  overflowY: 'auto',
  marginTop: '20px',
  fontSize: '1.1rem',
  lineHeight: '1.6'
};

const logEntryStyles = {
  margin: '5px 0'
};

export default BattleArenaHTML;