// ==========================================
// INTEGRATION GUIDE - How to use this React component in your project
// ==========================================

// 1. COPY THE COMPONENT
// Copy the entire SanctumBattleArena component from the artifact
// Save it as: src/components/SanctumBattleArena.jsx (or .js)

// 2. IMAGE HANDLING OPTIONS
// Choose one of these approaches for your images:

// OPTION A: Public folder (Recommended for beginners)
// Put your images in: public/images/
// Update the getPetImage function:
const getPetImage = (pet) => {
  const prefix = pet.tier.toLowerCase() === 'dissonant' ? 'dis' : 'pro';
  const formattedName = pet.name.replace(/\s+/g, '');
  return `/images/${prefix}${formattedName}.jpeg`; // Note the leading slash
};

// OPTION B: Import statements (Advanced)
// Put images in: src/assets/images/
// Import each image at the top of your file:
import disFlameWarlord from '../assets/images/disFlameWarlord.jpeg';
import disStormBear from '../assets/images/disStormBear.jpeg';
// ... import all images

// Then create an image map:
const imageMap = {
  'disFlameWarlord': disFlameWarlord,
  'disStormBear': disStormBear,
  // ... map all images
};

const getPetImage = (pet) => {
  const prefix = pet.tier.toLowerCase() === 'dissonant' ? 'dis' : 'pro';
  const formattedName = pet.name.replace(/\s+/g, '');
  return imageMap[`${prefix}${formattedName}`] || 'fallback-image.jpg';
};

// OPTION C: Dynamic imports (Most flexible)
const getPetImage = (pet) => {
  const prefix = pet.tier.toLowerCase() === 'dissonant' ? 'dis' : 'pro';
  const formattedName = pet.name.replace(/\s+/g, '');
  
  try {
    return require(`../assets/images/${prefix}${formattedName}.jpeg`);
  } catch (error) {
    return 'fallback-image.jpg'; // Fallback if image doesn't exist
  }
};

// 3. UPDATE YOUR CREATURE DATA
// Replace the demo creatures with your actual data:
const yourCreatures = [
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
    rarity: 'Legendary'
    // No need for image property - getPetImage will handle it
  },
  // ... your other creatures
];

// 4. CONNECT TO YOUR BACKEND (if you have one)
// Replace the demo data loading with your API call:
useEffect(() => {
  const loadCreatures = async () => {
    try {
      const response = await fetch('/api/pets');
      if (response.ok) {
        const data = await response.json();
        setCreatures(data);
      } else {
        // Fallback to demo data
        setCreatures(yourCreatures);
      }
    } catch (error) {
      console.error('Failed to load creatures:', error);
      setCreatures(yourCreatures);
    }
  };
  
  loadCreatures();
}, []);

// 5. USE IN YOUR APP
// In your main App.js or wherever you want to use it:

import React from 'react';
import SanctumBattleArena from './components/SanctumBattleArena';

function App() {
  return (
    <div className="App">
      <SanctumBattleArena />
    </div>
  );
}

export default App;

// 6. STYLING CONSIDERATIONS
// The component uses inline styles via styled-jsx
// If you prefer external CSS, you can:

// OPTION A: Extract to a CSS file
// Create: src/components/SanctumBattleArena.css
// Move all the styles from the <style jsx> block
// Import it: import './SanctumBattleArena.css';

// OPTION B: Use CSS Modules
// Create: src/components/SanctumBattleArena.module.css
// Import: import styles from './SanctumBattleArena.module.css';
// Use: className={styles.creatureCard}

// OPTION C: Use styled-components or emotion
// Install: npm install styled-components
// Convert the styles to styled-components

// 7. FOLDER STRUCTURE EXAMPLE
/*
src/
├── components/
│   ├── SanctumBattleArena.jsx
│   └── SanctumBattleArena.css (optional)
├── assets/
│   └── images/
│       ├── disFlameWarlord.jpeg
│       ├── disStormBear.jpeg
│       └── ... (all your creature images)
├── App.js
└── index.js

OR if using public folder:

public/
├── images/
│   ├── disFlameWarlord.jpeg
│   ├── disStormBear.jpeg
│   └── ... (all your creature images)
└── index.html

src/
├── components/
│   └── SanctumBattleArena.jsx
├── App.js
└── index.js
*/

// 8. CUSTOMIZATION TIPS
// To add your price badges and flash sales to specific creatures:

// Add properties to your creature data:
const creatureWithSale = {
  _id: '1',
  name: 'Flame Warlord',
  // ... other properties
  price: 250,
  onSale: true,
  saleText: '25% OFF TODAY!'
};

// Update the render function to use these properties:
const renderCreatureSelection = () => (
  <div className="creature-selection">
    <h2>Choose Your Combatants</h2>
    <div className="selection-grid">
      {creatures.map(creature => {
        const isSelected = selectedCreatures.find(c => c._id === creature._id);
        
        return (
          <div
            key={creature._id}
            className={`creature-option ${isSelected ? 'selected' : ''}`}
            onClick={() => selectCreature(creature)}
            style={{ position: 'relative' }}
          >
            {creature.onSale && (
              <div className="flash-sale">
                {creature.saleText || '⚡ 25% OFF TODAY!'}
              </div>
            )}
            {/* ... rest of creature card */}
            <span className="price-badge">
              💎 {creature.price || 250}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

// 9. DEPLOYMENT NOTES
// - Make sure all image files are included in your build
// - Test image loading in production
// - Consider image optimization for better performance
// - Add loading states for better UX

// 10. DEBUGGING TIPS
// If images aren't loading:
// - Check the browser Network tab for 404 errors
// - Verify file paths match exactly (case-sensitive)
// - Check that files are in the correct directory
// - Use the fallback image system shown above