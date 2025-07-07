import React, { useState, useEffect, useRef } from 'react';

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
  
  const battleInterval = useRef(null);

  // Demo creatures data
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
      image: 'https://picsum.photos/200/150?random=1'
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
      image: 'https://picsum.photos/200/150?random=2'
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
      image: 'https://picsum.photos/200/150?random=3'
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
      image: 'https://picsum.photos/200/150?random=4'
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
      image: 'https://picsum.photos/200/150?random=5'
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
      image: 'https://picsum.photos/200/150?random=6'
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
      image: 'https://picsum.photos/200/150?random=7'
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
      image: 'https://picsum.photos/200/150?random=8'
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
      image: 'https://picsum.photos/200/150?random=9'
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
      image: 'https://picsum.photos/200/150?random=10'
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

  // Initialize creatures
  useEffect(() => {
    setCreatures(demoCreatures);
  }, []);

  // Helper functions
  const getPetImage = (pet) => {
    // For demo purposes, using placeholder images
    // In your actual project, replace this with your image paths
    const prefix = pet.tier.toLowerCase() === 'dissonant' ? 'dis' : 'pro';
    const formattedName = pet.name.replace(/\s+/g, '');
    
    // Return placeholder for artifact demo
    return `/images/${prefix}${formattedName}.jpeg`; // Note the leading slash
    
    // In your real project, use:
    // return `./images/${prefix}${formattedName}.jpeg`;
    // OR if using imports:
    // return require(`./images/${prefix}${formattedName}.jpeg`);
    // OR if using a public folder:
    // return `/images/${prefix}${formattedName}.jpeg`;
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
    if (selectedCreatures.length === 2) {
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
      
      setCreature1(c1);
      setCreature2(c2);
      setGameState('battle');
      setBattleLog([]);
      addLogEntry(`${c1.name} VS ${c2.name} - BATTLE START!`, 'special');
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
          
          // Check for victory
          if (newHp <= 0) {
            endBattle(attacker);
          }
          
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
    if (!battleActive || battleTurnActive || !creature1 || !creature2 || creature1.currentHp <= 0 || creature2.currentHp <= 0) {
      clearInterval(battleInterval.current);
      return;
    }

    setBattleTurnActive(true);

    const updateCreature = (num, updates) => {
      if (num === 1) {
        setCreature1(prev => ({ ...prev, ...updates }));
      } else {
        setCreature2(prev => ({ ...prev, ...updates }));
      }
    };

    // Get current creature states for calculations
    const currentCreature1 = creature1;
    const currentCreature2 = creature2;

    // Determine attacker based on speed
    let attacker, defender, attackerNum, defenderNum;
    
    if (Math.random() < (currentCreature1.speed / (currentCreature1.speed + currentCreature2.speed))) {
      attacker = currentCreature1;
      defender = currentCreature2;
      attackerNum = 1;
      defenderNum = 2;
    } else {
      attacker = currentCreature2;
      defender = currentCreature1;
      attackerNum = 2;
      defenderNum = 1;
    }

    performAttack(attacker, defender, attackerNum, defenderNum, updateCreature);
  };

  const autoBattle = () => {
    if (battleActive) return;
    
    setBattleActive(true);
    battleInterval.current = setInterval(battleTurn, 4000);
  };

  const endBattle = (winner) => {
    setBattleActive(false);
    setBattleTurnActive(false);
    clearInterval(battleInterval.current);
    
    setBattlesWon(prev => prev + 1);
    addLogEntry(`🏆 ${winner.name} WINS THE BATTLE! 🏆`, 'special');
    screenFlash();
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
                src={creature.image} 
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
        <img className="creature-image" src={creature.image} alt={creature.name} />
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

  return (
    <div className="sanctum-arena">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .sanctum-arena {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0f1f 50%, #0d0d1f 100%);
          color: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        .sanctum-arena::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><filter id="glow"><feGaussianBlur stdDeviation="3.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle cx="100" cy="100" r="2" fill="%23ffffff22" filter="url(%23glow)"><animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/></circle><circle cx="300" cy="200" r="1.5" fill="%23ffffff33" filter="url(%23glow)"><animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite"/></circle><circle cx="500" cy="150" r="2" fill="%23ffffff22" filter="url(%23glow)"><animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite"/></circle><circle cx="700" cy="300" r="1" fill="%23ffffff44" filter="url(%23glow)"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/></circle><circle cx="900" cy="250" r="2.5" fill="%23ffffff22" filter="url(%23glow)"><animate attributeName="opacity" values="0;1;0" dur="3.5s" repeatCount="indefinite"/></circle></svg>') no-repeat;
          opacity: 0.6;
          z-index: -1;
          animation: drift 30s infinite alternate;
        }

        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-50px, -30px) scale(1.1); }
        }

        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-50px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.8);
          }
        }

        @keyframes flash {
          0% { opacity: 0; }
          50% { opacity: 0.8; }
          100% { opacity: 0; }
        }

        .header {
          background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 100%);
          padding: 20px;
          text-align: center;
          border-bottom: 2px solid #8b4513;
          box-shadow: 0 2px 20px rgba(139, 69, 19, 0.5);
        }

        .header h1 {
          font-size: 2.5rem;
          background: linear-gradient(45deg, #ffd700, #ff6b6b, #ffd700);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          margin-bottom: 10px;
          animation: titlePulse 2s ease-in-out infinite;
        }

        @keyframes titlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .sanctum-info {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .sanctum-stat {
          background: rgba(255, 215, 0, 0.1);
          padding: 10px 20px;
          border-radius: 20px;
          border: 1px solid rgba(255, 215, 0, 0.3);
          font-size: 0.9rem;
          min-width: 150px;
        }

        .main-content {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .battle-stage {
          width: 100%;
          max-width: 1400px;
          background: radial-gradient(ellipse at center, rgba(138, 43, 226, 0.1) 0%, transparent 70%);
          border-radius: 20px;
          padding: 40px;
          position: relative;
          min-height: 600px;
        }

        .creature-selection {
          margin-bottom: 40px;
          text-align: center;
        }

        .selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-top: 20px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .creature-option {
          background: linear-gradient(135deg, #2a2a3a 0%, #1a1a2a 100%);
          border: 2px solid #444;
          border-radius: 10px;
          padding: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .creature-option::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffe66d, #ff6b6b);
          border-radius: 10px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
          animation: borderRotate 3s linear infinite;
        }

        @keyframes borderRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .creature-option:hover::before {
          opacity: 1;
        }

        .creature-option:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        }

        .creature-option.selected {
          border-color: #ffd700;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        .creature-option img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 5px;
        }

        .creature-option h4 {
          margin-top: 10px;
          font-size: 0.9rem;
          color: #ffd700;
        }

        .creature-option .tier {
          font-size: 0.75rem;
          color: #888;
          margin-top: 5px;
        }

        .price-badge {
          position: absolute;
          top: 5px;
          right: 5px;
          background: rgba(255, 215, 0, 0.9);
          color: #000;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: bold;
        }

        .flash-sale {
          position: absolute;
          top: -5px;
          left: -5px;
          background: linear-gradient(45deg, #ff6b6b, #ff8787);
          color: white;
          padding: 4px 8px;
          border-radius: 0 0 10px 0;
          font-size: 0.6rem;
          font-weight: bold;
          animation: flashSale 1s ease infinite;
          z-index: 2;
        }

        @keyframes flashSale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .battle-arena {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          position: relative;
          min-height: 500px;
          flex-wrap: wrap;
        }

        .creature-card {
          background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%);
          border: 3px solid #444;
          border-radius: 15px;
          padding: 20px;
          width: 350px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
        }

        .creature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
          pointer-events: none;
        }

        .creature-card.wind-up {
          animation: windUp 0.5s ease;
          transform-origin: bottom center;
        }

        @keyframes windUp {
          0% { transform: scale(1); }
          50% { transform: scale(1.05) translateY(-10px); }
          100% { transform: scale(1); }
        }

        .creature-card.special-windup {
          animation: specialWindup 1s ease infinite;
        }

        @keyframes specialWindup {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.9); }
        }

        .creature-card.attacking {
          animation: attackPulse 0.5s ease;
          z-index: 10;
        }

        @keyframes attackPulse {
          0% { transform: scale(1) translateX(0); }
          25% { transform: scale(1.1) translateX(20px); }
          50% { transform: scale(1.15) translateX(30px); }
          100% { transform: scale(1) translateX(0); }
        }

        .creature-card.damaged {
          animation: damagedShake 0.5s ease;
        }

        @keyframes damagedShake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-10px) rotate(-1deg); }
          20% { transform: translateX(10px) rotate(1deg); }
          30% { transform: translateX(-10px) rotate(-1deg); }
          40% { transform: translateX(10px) rotate(1deg); }
          50% { transform: translateX(-5px) rotate(-0.5deg); }
          60% { transform: translateX(5px) rotate(0.5deg); }
        }

        .creature-card.special-attack {
          animation: specialGlow 1s ease;
        }

        @keyframes specialGlow {
          0% { box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7); }
          50% { box-shadow: 0 0 60px rgba(255, 215, 0, 0.8), 0 0 100px rgba(255, 215, 0, 0.4); }
          100% { box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7); }
        }

        .creature-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid #333;
          margin-bottom: 15px;
          position: relative;
        }

        .creature-name {
          font-size: 1.5rem;
          color: #ffd700;
          text-align: center;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .creature-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 15px;
        }

        .stat {
          background: rgba(255, 255, 255, 0.05);
          padding: 8px;
          border-radius: 5px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-label {
          font-size: 0.75rem;
          color: #888;
          display: block;
        }

        .stat-value {
          font-size: 1.2rem;
          font-weight: bold;
          color: #fff;
        }

        .health-bar {
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid #333;
          border-radius: 20px;
          padding: 3px;
          margin-bottom: 15px;
          position: relative;
          overflow: hidden;
        }

        .health-fill {
          height: 20px;
          background: linear-gradient(90deg, #ff3333 0%, #ff6666 100%);
          border-radius: 15px;
          transition: width 0.5s ease, background 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .health-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.2) 100%);
          animation: healthShine 2s ease-in-out infinite;
        }

        @keyframes healthShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .health-fill.critical {
          background: linear-gradient(90deg, #ff0000 0%, #990000 100%);
          animation: criticalPulse 0.5s ease infinite;
        }

        @keyframes criticalPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .health-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.9rem;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        }

        .vs-display {
          font-size: 3rem;
          font-weight: bold;
          color: #ffd700;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          animation: vsPulse 1s ease infinite;
          margin: 20px 0;
        }

        @keyframes vsPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .battle-controls {
          margin-top: 30px;
          text-align: center;
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .battle-btn {
          background: linear-gradient(45deg, #ff6b6b, #ff8787);
          color: white;
          border: none;
          padding: 15px 40px;
          font-size: 1.2rem;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          min-width: 180px;
        }

        .battle-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .battle-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .battle-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.5);
        }

        .battle-btn:disabled {
          background: linear-gradient(45deg, #666, #888);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .battle-log {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid #333;
          border-radius: 10px;
          padding: 20px;
          max-height: 300px;
          overflow-y: auto;
          margin-top: 20px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }

        .battle-log h3 {
          color: #ffd700;
          margin-bottom: 15px;
          text-align: center;
        }

        .log-entry {
          padding: 8px;
          margin-bottom: 5px;
          border-radius: 5px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .log-entry.damage {
          background: rgba(255, 107, 107, 0.2);
          border-left: 3px solid #ff6b6b;
        }

        .log-entry.special {
          background: rgba(255, 215, 0, 0.2);
          border-left: 3px solid #ffd700;
        }

        .log-entry.heal {
          background: rgba(76, 205, 196, 0.2);
          border-left: 3px solid #4ecdc4;
        }

        .log-entry.critical {
          background: rgba(255, 0, 0, 0.3);
          border-left: 3px solid #ff0000;
          font-weight: bold;
        }

        .log-entry.status {
          background: rgba(155, 89, 182, 0.2);
          border-left: 3px solid #9b59b6;
        }

        .log-entry.advantage {
          background: rgba(46, 204, 113, 0.2);
          border-left: 3px solid #2ecc71;
        }

        .dissonant-ultimate {
          animation: ultimateShake 0.5s ease;
        }

        @keyframes ultimateShake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-10px, -10px); }
          20% { transform: translate(10px, 10px); }
          30% { transform: translate(-10px, 10px); }
          40% { transform: translate(10px, -10px); }
          50% { transform: translate(-5px, -5px); }
          60% { transform: translate(5px, 5px); }
          70% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
        }

        @media (max-width: 768px) {
          .header h1 {
            font-size: 2rem;
          }

          .sanctum-info {
            flex-direction: column;
            gap: 10px;
          }

          .selection-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          }

          .battle-arena {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            transform: scale(0.9);
          }

          .creature-card {
            width: 100%;
            max-width: 300px;
            padding: 15px;
          }

          .creature-image {
            height: 180px;
          }

          .vs-display {
            margin: 0 10px;
            font-size: 2.5rem;
            align-self: center;
          }
        }

        @media (max-width: 480px) {
          .battle-arena {
            transform: scale(0.8);
            gap: 10px;
          }
          
          .creature-card {
            max-width: 250px;
          }
          
          .vs-display {
            font-size: 2rem;
          }

          .header h1 {
            font-size: 1.7rem;
          }

          .sanctum-stat {
            padding: 8px 12px;
            font-size: 0.8rem;
            min-width: 120px;
          }

          .battle-btn {
            padding: 12px 25px;
            font-size: 1rem;
            min-width: 150px;
          }

          .creature-card {
            padding: 12px;
          }

          .creature-image {
            height: 160px;
          }

          .creature-name {
            font-size: 1.3rem;
          }

          .stat-value {
            font-size: 1rem;
          }

          .vs-display {
            font-size: 2.5rem;
          }
        }
      `}</style>

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