import React, { useState, useEffect } from 'react';
import { useAuth } from '../content/authContent';
import Footer from './Footer';

const BattleArenaWorking = () => {
  const { token } = useAuth();
  
  // State management
  const [ownedPets, setOwnedPets] = useState([]);
  const [selectedPet1, setSelectedPet1] = useState(null);
  const [selectedPet2, setSelectedPet2] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [battleSetup, setBattleSetup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [battling, setBattling] = useState(false);

  // Fetch user's owned pets for battle
  useEffect(() => {
    fetchOwnedPets();
  }, [token]);

  const fetchOwnedPets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/sanctum', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.sanctum && data.sanctum.collection && data.sanctum.collection.creatures) {
          setOwnedPets(data.sanctum.collection.creatures);
        } else {
          setError('No creatures found in your collection');
        }
      } else {
        setError('Failed to load your collection');
      }
    } catch (err) {
      console.error('Error fetching owned pets:', err);
      setError('Network error loading collection');
    } finally {
      setLoading(false);
    }
  };

  const setupBattle = async () => {
    if (!selectedPet1 || !selectedPet2) {
      setError('Please select two different pets for battle');
      return;
    }

    if (selectedPet1.id === selectedPet2.id) {
      setError('Please select two different pets');
      return;
    }

    try {
      setBattling(true);
      setError(null);
      setBattleResult(null);

      const response = await fetch('/api/auth/sanctum-battle/setup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          petId1: selectedPet1.id,
          petId2: selectedPet2.id
        })
      });

      if (response.ok) {
        const data = await response.json();
        setBattleSetup(data.battleSetup);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to setup battle');
      }
    } catch (err) {
      console.error('Error setting up battle:', err);
      setError('Network error setting up battle');
    } finally {
      setBattling(false);
    }
  };

  const executeBattle = async () => {
    if (!battleSetup) {
      setError('Battle not setup properly');
      return;
    }

    try {
      setBattling(true);
      setError(null);

      const response = await fetch('/api/auth/battle/execute', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          petId1: selectedPet1.id,
          petId2: selectedPet2.id
        })
      });

      if (response.ok) {
        const data = await response.json();
        setBattleResult(data);
        setBattleSetup(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Battle execution failed');
      }
    } catch (err) {
      console.error('Error executing battle:', err);
      setError('Network error during battle');
    } finally {
      setBattling(false);
    }
  };

  const resetBattle = () => {
    setSelectedPet1(null);
    setSelectedPet2(null);
    setBattleResult(null);
    setBattleSetup(null);
    setError(null);
  };

  // Helper function for image mapping
  const getPetImage = (pet) => {
    // Map creature names to actual image files
    const imageMap = {
      'Flame Warlord': '/images/disChimp.png',
      'Storm Bear': '/images/disPolar.png', 
      'Forest Chimp': '/images/proChimp.png',
      'Arctic Bear': '/images/proPolar.jpeg',
      'Phoenix Lord': '/images/disEagle.jpeg',
      'Golden Tiger': '/images/proTiger.jpeg',
      'Inferno Tiger': '/images/disTiger.jpeg',
      'Celestial Flamingo': '/images/proPink.png',
      'Noble Steed': '/images/proArabian.jpeg',
      'Gentle Panda': '/images/proPanda.jpeg',
      'Royal Lion': '/images/proLion.jpeg',
      'Flame Lion': '/images/disLion.jpeg',
      'Shadow Wolf': '/images/disWolf.jpeg',
      'Wolf Pup': '/images/proWolf.jpeg',
      'Golden Eagle': '/images/proEagle.jpeg',
      'Girragon': '/images/disGirragon.jpeg',
      'Savanna Giraffe': '/images/proGiraffe.jpeg'
    };
    
    return imageMap[pet.identity?.name] || pet.meta?.image || '/images/placeholder.png';
  };

  const getPetDisplayInfo = (pet) => {
    return {
      id: pet.id,
      name: pet.identity?.name || 'Unknown',
      species: pet.identity?.species || 'Unknown',
      tier: pet.identity?.tier || 'Unknown',
      type: pet.identity?.type || 'Unknown',
      image: getPetImage(pet),
      totalPower: pet.attributes?.totalPower || 0,
      rarity: pet.meta?.rarity || 'Common'
    };
  };

  if (loading) {
    return (
      <div className="page-container">
        <div style={containerStyles}>
          <div style={loadingStyles}>
            <h2>⚔️ Loading Battle Arena...</h2>
            <div style={spinnerStyles}></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (ownedPets.length === 0) {
    return (
      <div className="page-container">
        <div style={containerStyles}>
          <div style={errorContainerStyles}>
            <h2>⚠️ No Creatures Available</h2>
            <p>You need to collect some creatures before you can battle!</p>
            <p>Visit the <a href="/gallery" style={linkStyles}>Gallery</a> to collect creatures.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={containerStyles}>
        {/* Header */}
        <section style={headerStyles}>
          <h1 style={titleStyles}>⚔️ Battle Arena</h1>
          <p style={subtitleStyles}>Select two of your creatures to battle!</p>
        </section>

        {/* Error Display */}
        {error && (
          <div style={errorStyles}>
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* Pet Selection */}
        {!battleResult && !battleSetup && (
          <section style={selectionSectionStyles}>
            <h2 style={sectionTitleStyles}>Choose Your Fighters</h2>
            
            <div style={selectedPetsStyles}>
              <div style={selectedPetSlotStyles}>
                <h3>Fighter 1</h3>
                {selectedPet1 ? (
                  <div style={selectedPetCardStyles}>
                    <img 
                      src={selectedPet1.image} 
                      alt={selectedPet1.name} 
                      style={petImageStyles}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div style={{...petImageStyles, display: 'none', backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666'}}>
                      No Image
                    </div>
                    <h4>{selectedPet1.name}</h4>
                    <p>{selectedPet1.species} • {selectedPet1.type}</p>
                    <p>Power: {selectedPet1.totalPower}</p>
                    <button onClick={() => setSelectedPet1(null)} style={removeButtonStyles}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <div style={emptySlotStyles}>
                    <p>Select a creature</p>
                  </div>
                )}
              </div>

              <div style={vsStyles}>VS</div>

              <div style={selectedPetSlotStyles}>
                <h3>Fighter 2</h3>
                {selectedPet2 ? (
                  <div style={selectedPetCardStyles}>
                    <img 
                      src={selectedPet2.image} 
                      alt={selectedPet2.name} 
                      style={petImageStyles}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div style={{...petImageStyles, display: 'none', backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666'}}>
                      No Image
                    </div>
                    <h4>{selectedPet2.name}</h4>
                    <p>{selectedPet2.species} • {selectedPet2.type}</p>
                    <p>Power: {selectedPet2.totalPower}</p>
                    <button onClick={() => setSelectedPet2(null)} style={removeButtonStyles}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <div style={emptySlotStyles}>
                    <p>Select a creature</p>
                  </div>
                )}
              </div>
            </div>

            {/* Available Pets Grid */}
            <div style={availablePetsStyles}>
              <h3>Your Collection ({ownedPets.length} creatures)</h3>
              <div style={petsGridStyles}>
                {ownedPets.map((pet, index) => {
                  const displayInfo = getPetDisplayInfo(pet);
                  const isSelected = selectedPet1?.id === displayInfo.id || selectedPet2?.id === displayInfo.id;
                  
                  return (
                    <div 
                      key={displayInfo.id || index} 
                      style={{...petCardStyles, ...(isSelected ? selectedCardStyles : {})}}
                      onClick={() => {
                        if (isSelected) return;
                        
                        if (!selectedPet1) {
                          setSelectedPet1(displayInfo);
                        } else if (!selectedPet2) {
                          setSelectedPet2(displayInfo);
                        }
                      }}
                    >
                      <img 
                        src={displayInfo.image} 
                        alt={displayInfo.name} 
                        style={cardImageStyles}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div style={{...cardImageStyles, display: 'none', backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666'}}>
                        No Image
                      </div>
                      <h4 style={petNameStyles}>{displayInfo.name}</h4>
                      <p style={petInfoStyles}>{displayInfo.species}</p>
                      <p style={petInfoStyles}>{displayInfo.tier} • {displayInfo.type}</p>
                      <p style={powerStyles}>Power: {displayInfo.totalPower}</p>
                      {isSelected && <div style={selectedBadgeStyles}>✓ Selected</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Battle Button */}
            {selectedPet1 && selectedPet2 && (
              <div style={battleButtonContainerStyles}>
                <button 
                  onClick={setupBattle} 
                  disabled={battling}
                  style={battleButtonStyles}
                >
                  {battling ? 'Setting up...' : '⚔️ Setup Battle'}
                </button>
              </div>
            )}
          </section>
        )}

        {/* Battle Setup Display */}
        {battleSetup && (
          <section style={battleSetupStyles}>
            <h2 style={sectionTitleStyles}>Battle Ready!</h2>
            
            <div style={battlePreviewStyles}>
              <div style={fighterCardStyles}>
                <img src={battleSetup.contestant1.meta.image} alt={battleSetup.contestant1.identity.name} style={fighterImageStyles} />
                <h3>{battleSetup.contestant1.identity.name}</h3>
                <p>{battleSetup.contestant1.identity.species} • {battleSetup.contestant1.identity.tier}</p>
                <p>Total Power: {battleSetup.contestant1.attributes.totalPower}</p>
              </div>

              <div style={vsLargeStyles}>VS</div>

              <div style={fighterCardStyles}>
                <img src={battleSetup.contestant2.meta.image} alt={battleSetup.contestant2.identity.name} style={fighterImageStyles} />
                <h3>{battleSetup.contestant2.identity.name}</h3>
                <p>{battleSetup.contestant2.identity.species} • {battleSetup.contestant2.identity.tier}</p>
                <p>Total Power: {battleSetup.contestant2.attributes.totalPower}</p>
              </div>
            </div>

            <div style={predictionStyles}>
              <h3>Battle Preview</h3>
              <p><strong>Predicted Winner:</strong> {battleSetup.battlePreview.predictedWinner.name} ({battleSetup.battlePreview.predictedWinner.winProbability}% chance)</p>
              <p><strong>Power Difference:</strong> {battleSetup.battlePreview.powerDifference}</p>
              <p><strong>Battle Type:</strong> {battleSetup.battlePreview.battleType}</p>
              <p><strong>Sanctum Bonus:</strong> {battleSetup.battlePreview.sanctumBonus}</p>
            </div>

            <div style={battleActionsStyles}>
              <button onClick={executeBattle} disabled={battling} style={executeButtonStyles}>
                {battling ? 'Battling...' : '⚔️ Execute Battle!'}
              </button>
              <button onClick={resetBattle} style={cancelButtonStyles}>Cancel</button>
            </div>
          </section>
        )}

        {/* Battle Result */}
        {battleResult && (
          <section style={resultSectionStyles}>
            <h2 style={sectionTitleStyles}>Battle Complete!</h2>
            
            <div style={resultContainerStyles}>
              <div style={winnerStyles}>
                <h3>🏆 Winner: {battleResult.winner.name}</h3>
                <p>Type: {battleResult.winner.type}</p>
                <p>Total Power: {battleResult.winner.totalPower}</p>
              </div>

              <div style={loserStyles}>
                <h3>💀 Defeated: {battleResult.loser.name}</h3>
                <p>Type: {battleResult.loser.type}</p>
                <p>Total Power: {battleResult.loser.totalPower}</p>
              </div>
            </div>

            <div style={summaryStyles}>
              <h3>Battle Summary</h3>
              <p>{battleResult.battleSummary}</p>
            </div>

            <div style={actionButtonsStyles}>
              <button onClick={resetBattle} style={newBattleButtonStyles}>
                🔄 New Battle
              </button>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

// Styles
const containerStyles = {
  minHeight: '80vh',
  padding: '20px',
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  color: '#fff'
};

const headerStyles = {
  textAlign: 'center',
  marginBottom: '40px'
};

const titleStyles = {
  fontSize: '3rem',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
  background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
};

const subtitleStyles = {
  fontSize: '1.2rem',
  opacity: '0.9'
};

const loadingStyles = {
  textAlign: 'center',
  padding: '60px 20px'
};

const spinnerStyles = {
  width: '40px',
  height: '40px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #ffd700',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '20px auto'
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

const selectionSectionStyles = {
  marginBottom: '40px'
};

const sectionTitleStyles = {
  fontSize: '2rem',
  textAlign: 'center',
  marginBottom: '30px',
  color: '#ffd700'
};

const selectedPetsStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '40px',
  marginBottom: '40px',
  flexWrap: 'wrap'
};

const selectedPetSlotStyles = {
  textAlign: 'center',
  minWidth: '200px'
};

const selectedPetCardStyles = {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '20px',
  borderRadius: '15px',
  border: '2px solid #ffd700'
};

const emptySlotStyles = {
  background: 'rgba(255, 255, 255, 0.05)',
  padding: '40px 20px',
  borderRadius: '15px',
  border: '2px dashed #666',
  minHeight: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const vsStyles = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#ff6b6b'
};

const petImageStyles = {
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  borderRadius: '10px',
  marginBottom: '10px'
};

const removeButtonStyles = {
  background: '#ff4757',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '20px',
  cursor: 'pointer',
  marginTop: '10px'
};

const availablePetsStyles = {
  marginBottom: '30px'
};

const petsGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '20px',
  marginTop: '20px'
};

const petCardStyles = {
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '15px',
  padding: '15px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '2px solid transparent'
};

const selectedCardStyles = {
  border: '2px solid #28a745',
  background: 'rgba(40, 167, 69, 0.2)'
};

const cardImageStyles = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '10px',
  marginBottom: '10px'
};

const petNameStyles = {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  margin: '10px 0 5px 0'
};

const petInfoStyles = {
  fontSize: '0.9rem',
  margin: '2px 0',
  opacity: '0.8'
};

const powerStyles = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#ffd700',
  margin: '5px 0'
};

const selectedBadgeStyles = {
  background: '#28a745',
  color: '#fff',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '0.8rem',
  marginTop: '5px'
};

const battleButtonContainerStyles = {
  textAlign: 'center'
};

const battleButtonStyles = {
  background: 'linear-gradient(45deg, #ff6b6b, #ff8787)',
  color: '#fff',
  border: 'none',
  padding: '15px 40px',
  borderRadius: '30px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
};

const battleSetupStyles = {
  textAlign: 'center',
  marginBottom: '40px'
};

const battlePreviewStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '40px',
  marginBottom: '30px',
  flexWrap: 'wrap'
};

const fighterCardStyles = {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '20px',
  borderRadius: '15px',
  border: '2px solid #ffd700',
  textAlign: 'center',
  minWidth: '200px'
};

const fighterImageStyles = {
  width: '120px',
  height: '120px',
  objectFit: 'cover',
  borderRadius: '15px',
  marginBottom: '15px'
};

const vsLargeStyles = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#ff6b6b'
};

const predictionStyles = {
  background: 'rgba(255, 215, 0, 0.1)',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px',
  textAlign: 'left',
  maxWidth: '600px',
  margin: '0 auto 20px auto'
};

const battleActionsStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px'
};

const executeButtonStyles = {
  background: 'linear-gradient(45deg, #28a745, #34ce57)',
  color: '#fff',
  border: 'none',
  padding: '15px 30px',
  borderRadius: '25px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const cancelButtonStyles = {
  background: 'transparent',
  color: '#fff',
  border: '2px solid #6c757d',
  padding: '15px 30px',
  borderRadius: '25px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const resultSectionStyles = {
  textAlign: 'center'
};

const resultContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginBottom: '30px',
  flexWrap: 'wrap'
};

const winnerStyles = {
  background: 'rgba(40, 167, 69, 0.2)',
  padding: '20px',
  borderRadius: '15px',
  border: '2px solid #28a745'
};

const loserStyles = {
  background: 'rgba(255, 0, 0, 0.1)',
  padding: '20px',
  borderRadius: '15px',
  border: '2px solid #dc3545'
};

const summaryStyles = {
  background: 'rgba(255, 215, 0, 0.1)',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px',
  maxWidth: '600px',
  margin: '0 auto 20px auto'
};

const actionButtonsStyles = {
  textAlign: 'center'
};

const newBattleButtonStyles = {
  background: 'linear-gradient(45deg, #007bff, #0056b3)',
  color: '#fff',
  border: 'none',
  padding: '15px 30px',
  borderRadius: '25px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer'
};

// Add CSS animations
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .page-container button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
    
    .page-container [style*="petCardStyles"]:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }
  `;
  document.head.appendChild(style);
}

export default BattleArenaWorking;