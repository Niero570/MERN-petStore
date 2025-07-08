// CreatureCard.jsx
import React from 'react';

function CreatureCard({ creature, sanctumTier }) {
  const getTierColor = (tier) => {
    const colors = {
      'Protector': '#10b981',
      'Regent': '#3b82f6', 
      'Shield': '#f59e0b',
      'Champion': '#8b5cf6',
      'Dissonant': '#ef4444'
    };
    return colors[tier] || '#6b7280';
  };

  // Helper function for image mapping
  const getPetImage = (creature) => {
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
    
    return imageMap[creature.identity?.name] || creature.meta?.image || '/images/placeholder.png';
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      border: '1px solid #e5e7eb',
      borderRadius: '8px', 
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}>
      {/* Creature Image */}
      <div style={{ marginBottom: '12px', textAlign: 'center' }}>
        <img 
          src={getPetImage(creature)} 
          alt={creature.identity.name} 
          style={{ 
            width: '120px', 
            height: '120px', 
            objectFit: 'cover', 
            borderRadius: '8px',
            border: `2px solid ${getTierColor(creature.identity.tier)}`
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div style={{
          width: '120px', 
          height: '120px', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '8px',
          border: `2px solid ${getTierColor(creature.identity.tier)}`,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: '#666',
          margin: '0 auto'
        }}>
          No Image
        </div>
      </div>

      {/* Creature Header */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold' }}>
            {creature.identity.name}
          </h3>
          <span style={{ 
            backgroundColor: getTierColor(creature.identity.tier),
            color: 'white',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {creature.identity.tier}
          </span>
        </div>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          {creature.identity.species} • {creature.identity.type}
        </p>
      </div>

      {/* Attributes */}
      <div style={{ marginBottom: '12px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>Attributes</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '12px' }}>
          <div>Aggression: <strong>{creature.attributes.aggression}</strong></div>
          <div>Intuition: <strong>{creature.attributes.intuition}</strong></div>
          <div>Intimidation: <strong>{creature.attributes.intimidation}</strong></div>
          <div>Intensity: <strong>{creature.attributes.intensity}</strong></div>
        </div>
        <div style={{ marginTop: '8px', textAlign: 'center' }}>
          <span style={{ 
            backgroundColor: '#f3f4f6',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Total Power: {creature.attributes.totalPower}
          </span>
        </div>
      </div>

      {/* Prestige */}
      <div style={{ 
        borderTop: '1px solid #e5e7eb',
        paddingTop: '8px',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center'
      }}>
        Prestige Value: <strong>{creature.meta.prestigeValue}</strong>
      </div>
    </div>
  );
}

export default CreatureCard;