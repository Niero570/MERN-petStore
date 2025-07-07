import React, { useState, useEffect, useRef, useCallback } from 'react';
import './battle-arena.css';

const SanctumBattleArena = () => {
  // State management
  const [selectedCreatures, setSelectedCreatures] = useState([]);
  const [creature1, setCreature1] = useState(null);
  const [creature2, setCreature2] = useState(null);
  const [battleActive, setBattleActive] = useState(false);
  const [battleTurnActive, setBattleTurnActive] = useState(false);
  const [battlesWon, setBattlesWon] = useState(0);
  const [gameState, setGameState] = useState('selection'); // 'selection' or 'battle'
  const [battleLog, setBattleLog] = useState([]);
  const [creatures, setCreatures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const battleInterval = useRef(null);

  // Demo creatures data with real images
  const demoCreatures = [
    {
      _id: '1',
      name: 'Flame Warlord',
      species: 'Primate',
      tier: 'Dissonant',
      type: 'Fire',
      hp: 450,
      attack: 280,
      special: 'Inferno Rage',
      specialDamage: 320,
      heal: 0,
      speed: 85,
      rarity: 'Legendary',
      image: '/images/disChimp.png'
    },
    {
      _id: '2',
      name: 'Storm Bear',
      species: 'Bear',
      tier: 'Dissonant',
      type: 'Air',
      hp: 420,
      attack: 200,
      special: 'Lightning Maul',
      specialDamage: 250,
      heal: 50,
      speed: 60,
      rarity: 'Legendary',
      image: '/images/disPolar.png'
    },
    {
      _id: '3',
      name: 'Forest Chimp',
      species: 'Primate',
      tier: 'Protector',
      type: 'Earth',
      hp: 120,
      attack: 45,
      special: 'Vine Swing',
      specialDamage: 35,
      heal: 15,
      speed: 70,
      rarity: 'Common',
      image: '/images/proChimp.png'
    },
    {
      _id: '4',
      name: 'Arctic Bear',
      species: 'Bear',
      tier: 'Protector',
      type: 'Water',
      hp: 180,
      attack: 55,
      special: 'Ice Slam',
      specialDamage: 45,
      heal: 25,
      speed: 45,
      rarity: 'Uncommon',
      image: '/images/proPolar.jpeg'
    },
    {
      _id: '5',
      name: 'Phoenix Lord',
      species: 'Raptor',
      tier: 'Dissonant',
      type: 'Fire',
      hp: 320,
      attack: 280,
      special: 'Rebirth Flame',
      specialDamage: 300,
      heal: 100,
      speed: 98,
      rarity: 'Legendary',
      image: '/images/disEagle.jpeg'
    },
    {
      _id: '6',
      name: 'Golden Tiger',
      species: 'Feline',
      tier: 'Protector',
      type: 'Earth',
      hp: 140,
      attack: 65,
      special: 'Pounce Strike',
      specialDamage: 55,
      heal: 10,
      speed: 80,
      rarity: 'Uncommon',
      image: '/images/proTiger.jpeg'
    },
    {
      _id: '7',
      name: 'Inferno Tiger',
      species: 'Feline',
      tier: 'Dissonant',
      type: 'Fire',
      hp: 380,
      attack: 240,
      special: 'Blazing Maul',
      specialDamage: 290,
      heal: 0,
      speed: 90,
      rarity: 'Legendary',
      image: '/images/disTiger.jpeg'
    },
    {
      _id: '8',
      name: 'Celestial Flamingo',
      species: 'Avian',
      tier: 'Shield',
      type: 'Water',
      hp: 180,
      attack: 90,
      special: 'Healing Waters',
      specialDamage: 70,
      heal: 80,
      speed: 85,
      rarity: 'Rare',
      image: '/images/proPink.png'
    },
    {
      _id: '9',
      name: 'Noble Steed',
      species: 'Equine',
      tier: 'Shield',
      type: 'Earth',
      hp: 220,
      attack: 100,
      special: 'Gallant Charge',
      specialDamage: 120,
      heal: 50,
      speed: 85,
      rarity: 'Rare',
      image: '/images/proArabian.jpeg'
    },
    {
      _id: '10',
      name: 'Gentle Panda',
      species: 'Bear',
      tier: 'Protector',
      type: 'Earth',
      hp: 160,
      attack: 35,
      special: 'Bamboo Heal',
      specialDamage: 25,
      heal: 60,
      speed: 40,
      rarity: 'Common',
      image: '/images/proPanda.jpeg'
    }
  ];

  // Game constants
  const typeAdvantages = {
    Fire: { strongAgainst: ["Earth"], weakAgainst: ["Water"] },
    Water: { strongAgainst: ["Fire"], weakAgainst: ["Air"] },
    Air: { strongAgainst: ["Water"], weakAgainst: ["Earth"] },
    Earth: { strongAgainst: ["Air"], weakAgainst: ["Fire"] },
    Neutral: { strongAgainst: [], weakAgainst: [] }
  };

  const statusEffects = {
    burn: { damagePerTurn: 15, duration: 3 },
    stun: { missChance: 0.3, duration: 2 },
    poison: { damagePerTurn: 10, duration: 4 }
  };

  // Initialize creatures with error handling
  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate demo creatures data
      if (!demoCreatures || demoCreatures.length === 0) {
        throw new Error('No creatures data available');
      }
      
      // Validate each creature has required properties
      demoCreatures.forEach((creature, index) => {
        if (!creature.name || !creature.hp || !creature.attack) {
          throw new Error(`Invalid creature data at index ${index}`);
        }
      });
      
      setCreatures(demoCreatures);
      setLoading(false);
    } catch (err) {
      console.error('Error loading creatures:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  // Victory condition checker
  useEffect(() => {
    if (gameState === 'battle' && battleActive && creature1 && creature2) {
      if (creature1.currentHp <= 0 && creature2.currentHp > 0) {
        setTimeout(() => endBattle(creature2), 500); // Delay for dramatic effect
      } else if (creature2.currentHp <= 0 && creature1.currentHp > 0) {
        setTimeout(() => endBattle(creature1), 500); // Delay for dramatic effect
      }
    }
  }, [creature1?.currentHp, creature2?.currentHp, gameState, battleActive]);

  // Helper functions for image mapping
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
    
    return imageMap[pet.name] || pet.image || '/images/placeholder.png';
  };

  const addLogEntry = (text, type = 'damage') => {
    setBattleLog(prev => [{ text, type, id: Date.now() }, ...prev.slice(0, 9)]);
  };

  const createDamageNumber = (element, damage, type = 'normal') => {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const damageDiv = document.createElement('div');
    damageDiv.className = `damage-number ${type}`;
    damageDiv.textContent = damage;
    damageDiv.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: 2rem;
      font-weight: bold;
      pointer-events: none;
      z-index: 100;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
      animation: floatUp 1.5s ease-out forwards;
      color: ${type === 'critical' ? '#ff0000' : type === 'heal' ? '#4ecdc4' : type === 'special' ? '#ffd700' : type === 'advantage' ? '#2ecc71' : '#ff6b6b'};
    `;
    
    document.body.appendChild(damageDiv);
    setTimeout(() => damageDiv.remove(), 1500);
  };

  const screenFlash = () => {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      opacity: 0;
      pointer-events: none;
      z-index: 200;
      animation: flash 0.3s ease-out;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 300);
  };

  const calculateDamage = (attacker, defender, isSpecial) => {
    let damage = isSpecial ? attacker.specialDamage : attacker.attack;
    
    if (attacker.tier === 'Dissonant' && isSpecial) {
      damage *= 1.5;
    }
    
    const attackerType = attacker.type || 'Neutral';
    const defenderType = defender.type || 'Neutral';
    const advantages = typeAdvantages[attackerType] || typeAdvantages.Neutral;
    
    if (advantages.strongAgainst.includes(defenderType)) {
      damage *= 1.5;
      return { damage: Math.floor(damage), advantage: true };
    }
    
    if (advantages.weakAgainst.includes(defenderType)) {
      damage *= 0.75;
      return { damage: Math.floor(damage), advantage: false };
    }
    
    const isCritical = Math.random() < 0.15;
    if (isCritical) {
      damage *= 1.5;
      return { damage: Math.floor(damage), critical: true };
    }
    
    damage = Math.floor(damage * (0.9 + Math.random() * 0.2));
    return { damage, critical: false };
  };

  // Battle functions
  const selectCreature = (creature) => {
    if (selectedCreatures.length < 2 && !selectedCreatures.find(c => c._id === creature._id)) {
      setSelectedCreatures(prev => [...prev, creature]);
    } else if (selectedCreatures.find(c => c._id === creature._id)) {
      setSelectedCreatures(prev => prev.filter(c => c._id !== creature._id));
    }
  };

  const startBattle = () => {
    try {
      if (selectedCreatures.length !== 2) {
        throw new Error('Must select exactly 2 creatures to battle');
      }
      
      const c1 = { 
        ...selectedCreatures[0], 
        currentHp: selectedCreatures[0].hp,
        statusEffects: [],
        id: 1
      };
      const c2 = { 
        ...selectedCreatures[1], 
        currentHp: selectedCreatures[1].hp,
        statusEffects: [],
        id: 2
      };
      
      // Validate creatures have required properties
      if (!c1.hp || !c1.attack || !c2.hp || !c2.attack) {
        throw new Error('Invalid creature data for battle');
      }
      
      setCreature1(c1);
      setCreature2(c2);
      setGameState('battle');
      setBattleLog([]);
      addLogEntry(`${c1.name} VS ${c2.name} - BATTLE START!`, 'special');
      setError(null);
    } catch (err) {
      console.error('Error starting battle:', err);
      setError(err.message);
      addLogEntry(`❌ Battle Error: ${err.message}`, 'damage');
    }
  };

  const performAttack = (attacker, defender, attackerNum, defenderNum, updateCreature) => {
    const attackerElement = document.getElementById(`creature${attackerNum}Card`);
    const defenderElement = document.getElementById(`creature${defenderNum}Card`);

    // Initial wind-up animation
    attackerElement?.classList.add('wind-up');
    addLogEntry(`${attacker.name} is preparing to attack...`, 'special');
    
    setTimeout(() => {
      attackerElement?.classList.remove('wind-up');
      
      // Determine attack type
      const isSpecial = Math.random() < 0.3;
      
      if (isSpecial) {
        addLogEntry(`${attacker.name} is charging a SPECIAL ATTACK!`, 'special');
        attackerElement?.classList.add('special-windup');
      }
      
      setTimeout(() => {
        attackerElement?.classList.remove('special-windup');
        attackerElement?.classList.add('attacking');
        
        if (isSpecial) {
          attackerElement?.classList.add('special-attack');
        }
        
        // Apply damage after a delay
        setTimeout(() => {
          const damageInfo = calculateDamage(attacker, defender, isSpecial);
          let damage = damageInfo.damage;
          const isCritical = damageInfo.critical;
          const hasAdvantage = damageInfo.advantage;
          
          // Update defender health
          const newHp = Math.max(0, defender.currentHp - damage);
          updateCreature(defenderNum, { currentHp: newHp });
          
          defenderElement?.classList.add('damaged');
          
          // Create damage number
          let damageType = 'normal';
          if (isCritical) damageType = 'critical';
          else if (isSpecial) damageType = 'special';
          if (hasAdvantage) damageType = 'advantage';
          
          createDamageNumber(defenderElement, `-${damage}`, damageType);
          
          // Screen flash for special attacks
          if (attacker.tier === 'Dissonant' && isSpecial) {
            screenFlash();
            document.body.classList.add('dissonant-ultimate');
            setTimeout(() => document.body.classList.remove('dissonant-ultimate'), 500);
          }
          
          // Log entry
          let logText = `${attacker.name} `;
          if (isSpecial) {
            logText += `uses ${attacker.special} for `;
          } else {
            logText += `attacks for `;
          }
          logText += `${damage} damage`;
          
          if (isCritical) logText += ' (CRITICAL HIT!)';
          if (hasAdvantage) logText += ' (TYPE ADVANTAGE!)';
          
          addLogEntry(logText, isCritical ? 'critical' : (isSpecial ? 'special' : 'damage'));
          
          // Healing
          if (attacker.heal > 0 && attacker.currentHp < attacker.hp) {
            const healAmount = Math.floor(attacker.heal * (0.8 + Math.random() * 0.4));
            const newAttackerHp = Math.min(attacker.hp, attacker.currentHp + healAmount);
            updateCreature(attackerNum, { currentHp: newAttackerHp });
            
            setTimeout(() => {
              createDamageNumber(attackerElement, `+${healAmount}`, 'heal');
              addLogEntry(`${attacker.name} heals for ${healAmount}`, 'heal');
            }, 300);
          }
          
          // Victory check moved to useEffect for proper timing
          
          // Remove animation classes and reset battle turn lock
          setTimeout(() => {
            attackerElement?.classList.remove('attacking', 'special-attack');
            defenderElement?.classList.remove('damaged');
            setBattleTurnActive(false);
          }, 500);
          
        }, isSpecial ? 500 : 300);
        
      }, isSpecial ? 1000 : 500);
    }, 500);
  };

  const battleTurn = () => {
    console.log('Battle turn starting...', { battleActive, battleTurnActive, creature1: creature1?.name, creature2: creature2?.name });
    
    if (!battleActive || battleTurnActive || !creature1 || !creature2 || creature1.currentHp <= 0 || creature2.currentHp <= 0) {
      console.log('Battle turn cancelled:', { battleActive, battleTurnActive, creature1HP: creature1?.currentHp, creature2HP: creature2?.currentHp });
      clearInterval(battleInterval.current);
      return;
    }

    setBattleTurnActive(true);
    console.log('Battle turn lock set');

    const updateCreature = (num, updates) => {
      console.log(`Updating creature ${num}:`, updates);
      if (num === 1) {
        setCreature1(prev => ({ ...prev, ...updates }));
      } else {
        setCreature2(prev => ({ ...prev, ...updates }));
      }
    };

    // Determine attacker based on speed
    let attacker, defender, attackerNum, defenderNum;
    
    if (Math.random() < (creature1.speed / (creature1.speed + creature2.speed))) {
      attacker = creature1;
      defender = creature2;
      attackerNum = 1;
      defenderNum = 2;
    } else {
      attacker = creature2;
      defender = creature1;
      attackerNum = 2;
      defenderNum = 1;
    }

    console.log(`${attacker.name} attacks ${defender.name}`);
    performAttack(attacker, defender, attackerNum, defenderNum, updateCreature);
  };

  const autoBattle = () => {
    console.log('Auto battle starting...');
    if (battleActive) {
      console.log('Battle already active, returning');
      return;
    }
    
    // Clear any existing interval
    if (battleInterval.current) {
      clearInterval(battleInterval.current);
    }
    
    setBattleActive(true);
    setBattleTurnActive(false);
    console.log('Battle activated');
    
    // Start battle turns immediately, then every 3 seconds
    battleInterval.current = setInterval(battleTurn, 3000);
    
    // Execute first turn after short delay
    setTimeout(battleTurn, 500);
  };

  const endBattle = (winner) => {
    setBattleActive(false);
    setBattleTurnActive(false);
    clearInterval(battleInterval.current);
    
    setBattlesWon(prev => prev + 1);
    addLogEntry(`🏆 ${winner.name} WINS THE BATTLE! 🏆`, 'special');
    screenFlash();
    
    // Add victory celebration effect
    setTimeout(() => {
      addLogEntry(`🎉 Victory celebration! ${winner.name} reigns supreme! 🎉`, 'special');
    }, 1000);
  };

  const resetBattle = () => {
    setBattleActive(false);
    setBattleTurnActive(false);
    clearInterval(battleInterval.current);
    setSelectedCreatures([]);
    setCreature1(null);
    setCreature2(null);
    setGameState('selection');
    setBattleLog([]);
  };

  // Render creature selection
  const renderCreatureSelection = () => (
    <div className="creature-selection">
      <h2>Choose Your Combatants</h2>
      <div className="selection-grid">
        {creatures.map(creature => {
          const isSelected = selectedCreatures.find(c => c._id === creature._id);
          const isOnSale = Math.random() < 0.3; // 30% chance for flash sale
          
          return (
            <div
              key={creature._id}
              className={`creature-option ${isSelected ? 'selected' : ''}`}
              onClick={() => selectCreature(creature)}
              style={{ position: 'relative' }}
            >
              {isOnSale && <div className="flash-sale">⚡ 25% OFF TODAY!</div>}
              <img 
                src={getPetImage(creature)} 
                alt={creature.name}
                onError={(e) => {
                  e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"><rect fill="#333" width="200" height="150"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#fff" font-family="Arial" font-size="14">${creature.name}</text></svg>`;
                }}
              />
              <h4>{creature.name}</h4>
              <div className="tier">{creature.tier} • {creature.type}</div>
              <span className="price-badge">💎 250</span>
            </div>
          );
        })}
      </div>
      <button 
        className="battle-btn" 
        onClick={startBattle}
        disabled={selectedCreatures.length !== 2}
      >
        Start Epic Battle
      </button>
    </div>
  );

  // Render creature card
  const renderCreatureCard = (creature, cardId) => {
    if (!creature) return null;
    
    const healthPercentage = Math.max(0, (creature.currentHp / creature.hp) * 100);
    
    return (
      <div className={`creature-card ${creature.type.toLowerCase()}-type`} id={cardId}>
        <img className="creature-image" src={getPetImage(creature)} alt={creature.name} />
        <h3 className="creature-name">{creature.name}</h3>
        <div className="health-bar">
          <div 
            className={`health-fill ${healthPercentage <= 25 ? 'critical' : ''}`}
            style={{ width: `${healthPercentage}%` }}
          />
          <span className="health-text">
            {Math.max(0, Math.floor(creature.currentHp))}/{creature.hp}
          </span>
        </div>
        <div className="creature-stats">
          <div className="stat">
            <span className="stat-label">Attack</span>
            <span className="stat-value">{creature.attack}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Speed</span>
            <span className="stat-value">{creature.speed}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Type</span>
            <span className="stat-value">{creature.type}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Special</span>
            <span className="stat-value">{creature.special}</span>
          </div>
        </div>
      </div>
    );
  };

  // Error state
  if (error) {
    return (
      <div className="sanctum-arena">
        <div className="error-state">
          <h2>⚠️ Battle Arena Error</h2>
          <p>{error}</p>
          <button 
            className="battle-btn" 
            onClick={() => {
              setError(null);
              setLoading(true);
              window.location.reload();
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="sanctum-arena">
        <div className="loading-state">
          <h2>⚔️ Loading Battle Arena...</h2>
          <div className="loading-spinner">🔄</div>
        </div>
      </div>
    );
  }

  return (
    <div className="sanctum-arena">
      {/* Header */}
      <header className="header">
        <h1>⚔️ SANCTUM BATTLE ARENA ⚔️</h1>
        <div className="sanctum-info">
          <div className="sanctum-stat">🏛️ Apex Sanctum</div>
          <div className="sanctum-stat">⚡ Evolution Bonus: +60%</div>
          <div className="sanctum-stat">🔥 Battles Won: <span>{battlesWon}</span></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="battle-stage">
          {gameState === 'selection' && renderCreatureSelection()}

          {gameState === 'battle' && (
            <>
              {/* Battle Arena */}
              <div className="battle-arena">
                {renderCreatureCard(creature1, 'creature1Card')}
                
                {/* VS Display */}
                <div className="vs-display">VS</div>

                {renderCreatureCard(creature2, 'creature2Card')}
              </div>

              {/* Battle Controls */}
              <div className="battle-controls">
                <button 
                  className="battle-btn" 
                  onClick={autoBattle}
                  disabled={battleActive}
                >
                  {battleActive ? 'Battle in Progress...' : 'Let the Battle Begin!'}
                </button>
                <button className="battle-btn" onClick={resetBattle}>
                  New Battle
                </button>
              </div>

              {/* Battle Log */}
              <div className="battle-log">
                <h3>Battle Log</h3>
                <div>
                  {battleLog.map(entry => (
                    <div key={entry.id} className={`log-entry ${entry.type}`}>
                      {entry.text}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SanctumBattleArena;