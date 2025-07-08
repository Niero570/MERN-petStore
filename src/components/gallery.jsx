import React, { useState, useEffect } from 'react';
import { useAuth } from '../content/authContent';
import Footer from './Footer';

function Gallery() {
  const { user, token } = useAuth();
  
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
      'Savanna Giraffe': '/images/proGiraffe.jpeg',
      'Phoenix Flamingo': '/images/disPink.jpeg',
      'Arabian Unicorn': '/images/proArabian.jpeg',
      'Cosmic Unicorn': '/images/disArabian.jpeg',
      'Fire Panda': '/images/disPanda.jpeg'
    };
    
    return imageMap[creature.identity?.name] || creature.meta?.image || '/images/placeholder.png';
  };
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, owned, available
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      const response = await fetch('/api/auth/creatures-catalog', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCatalog(data.catalog);
      } else {
        setError('Failed to load creature catalog');
      }
    } catch (error) {
      console.error('Error fetching catalog:', error);
      setError('Network error loading catalog');
    } finally {
      setLoading(false);
    }
  };

  const acquirePet = async (petId) => {
    try {
      const response = await fetch(`/api/auth/collect-pet/${petId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Refresh catalog to update ownership status
        fetchCatalog();
        alert('Pet acquired successfully!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to acquire pet');
      }
    } catch (error) {
      console.error('Error acquiring pet:', error);
      alert('Network error acquiring pet');
    }
  };

  const getFilteredCreatures = () => {
    if (!catalog) return [];

    let filtered = catalog.creatures;

    // Filter by ownership
    if (filter === 'owned') {
      filtered = filtered.filter(creature => creature.isOwned);
    } else if (filter === 'available') {
      filtered = filtered.filter(creature => !creature.isOwned && creature.canAcquire);
    }

    // Filter by tier
    if (selectedTier !== 'all') {
      filtered = filtered.filter(creature => creature.identity.tier === selectedTier);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(creature => creature.identity.type === selectedType);
    }

    return filtered;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div style={loadingStyles}>
          <div style={spinnerStyles}></div>
          <h2>Loading PET Collection...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div style={errorStyles}>
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={fetchCatalog} style={retryButtonStyles}>
            🔄 Retry
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredCreatures = getFilteredCreatures();
  const tiers = ['all', 'Protector', 'Regent', 'Shield', 'Champion', 'Dissonant'];
  const types = ['all', 'Fire', 'Water', 'Earth', 'Air'];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section style={heroStyles}>
        <h1 style={heroTitleStyles}>🔮 PET Collection</h1>
        <p style={heroDescStyles}>
          Discover and collect legendary PETs from across the realm. 
          Build your ultimate Sanctum and unlock the power of Primal Elemental Tiered Symbiosis.
        </p>
        <div style={sanctumInfoStyles}>
          <div style={sanctumBadgeStyles}>
            🏛️ {catalog?.userSanctumTier || 'Alpha Sanctum'}
          </div>
          <div style={creatureCountStyles}>
            {catalog?.totalAvailable || 0} Creatures Available
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section style={filtersContainerStyles}>
        <div style={filtersWrapperStyles}>
          <div style={filterGroupStyles}>
            <label style={filterLabelStyles}>🔍 Show:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={filterSelectStyles}
            >
              <option value="all">All Creatures</option>
              <option value="owned">My Collection</option>
              <option value="available">Available to Acquire</option>
            </select>
          </div>

          <div style={filterGroupStyles}>
            <label style={filterLabelStyles}>⭐ Tier:</label>
            <select 
              value={selectedTier} 
              onChange={(e) => setSelectedTier(e.target.value)}
              style={filterSelectStyles}
            >
              {tiers.map(tier => (
                <option key={tier} value={tier}>
                  {tier === 'all' ? 'All Tiers' : tier}
                </option>
              ))}
            </select>
          </div>

          <div style={filterGroupStyles}>
            <label style={filterLabelStyles}>🔥 Type:</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              style={filterSelectStyles}
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={resultsCountStyles}>
          {filteredCreatures.length} creature{filteredCreatures.length !== 1 ? 's' : ''} found
        </div>
      </section>

      {/* Creatures Grid */}
      <section style={gridContainerStyles}>
        <div style={creaturesGridStyles}>
          {filteredCreatures.map((creature, index) => (
            <div key={creature.id || index} style={getCreatureCardStyles(creature)}>
              {/* Creature Image */}
              <div style={creatureImageContainerStyles}>
                <img 
                  src={getPetImage(creature)} 
                  alt={creature.identity.name}
                  style={creatureImageStyles}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{
                  ...creatureImageStyles,
                  display: 'none',
                  backgroundColor: '#f0f0f0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  No Image
                </div>
                {creature.isOwned && (
                  <div style={ownedBadgeStyles}>✓ OWNED</div>
                )}
                <div style={getTierBadgeStyles(creature.identity.tier)}>
                  {creature.identity.tier}
                </div>
              </div>

              {/* Creature Info */}
              <div style={creatureInfoStyles}>
                <h3 style={creatureNameStyles}>{creature.identity.name}</h3>
                <p style={creatureSpeciesStyles}>
                  {creature.identity.species} • {creature.identity.type}
                </p>

                {/* Stats */}
                <div style={statsContainerStyles}>
                  <div style={statRowStyles}>
                    <span style={statLabelStyles}>Power:</span>
                    <span style={statValueStyles}>{creature.attributes.totalPower}</span>
                  </div>
                  <div style={statRowStyles}>
                    <span style={statLabelStyles}>Prestige:</span>
                    <span style={statValueStyles}>{creature.meta.prestigeValue}</span>
                  </div>
                  <div style={statRowStyles}>
                    <span style={statLabelStyles}>Rarity:</span>
                    <span style={getRarityStyles(creature.meta.rarity)}>
                      {creature.meta.rarity}
                    </span>
                  </div>
                </div>

                {/* Attributes */}
                <div style={attributesContainerStyles}>
                  <div style={attributeStyles}>
                    <span style={attributeLabelStyles}>AGG</span>
                    <span style={attributeValueStyles}>{creature.attributes.aggression}</span>
                  </div>
                  <div style={attributeStyles}>
                    <span style={attributeLabelStyles}>INT</span>
                    <span style={attributeValueStyles}>{creature.attributes.intuition}</span>
                  </div>
                  <div style={attributeStyles}>
                    <span style={attributeLabelStyles}>ITM</span>
                    <span style={attributeValueStyles}>{creature.attributes.intimidation}</span>
                  </div>
                  <div style={attributeStyles}>
                    <span style={attributeLabelStyles}>ITS</span>
                    <span style={attributeValueStyles}>{creature.attributes.intensity}</span>
                  </div>
                </div>

                {/* Description */}
                {creature.lore.description && (
                  <p style={descriptionStyles}>{creature.lore.description}</p>
                )}

                {/* Action Button */}
                <div style={actionContainerStyles}>
                  {creature.isOwned ? (
                    <div style={ownedStatusStyles}>
                      ✓ In Your Collection
                    </div>
                  ) : creature.canAcquire ? (
                    <button 
                      onClick={() => acquirePet(creature.id)}
                      style={acquireButtonStyles}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      🎯 Acquire Pet
                    </button>
                  ) : (
                    <div style={lockedStatusStyles}>
                      🔒 Requires {creature.meta.sanctumRequirement}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCreatures.length === 0 && (
          <div style={noResultsStyles}>
            <h3>No creatures found</h3>
            <p>Try adjusting your filters to see more creatures.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

// Styles
const loadingStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60vh',
  gap: '20px'
};

const spinnerStyles = {
  width: '40px',
  height: '40px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #ffd700',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};

const errorStyles = {
  textAlign: 'center',
  padding: '40px',
  color: '#ff4757'
};

const retryButtonStyles = {
  background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '25px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '20px'
};

const heroStyles = {
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  color: '#fff',
  padding: '60px 20px',
  textAlign: 'center',
  borderBottom: '3px solid #8b4513'
};

const heroTitleStyles = {
  fontSize: '3rem',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
};

const heroDescStyles = {
  fontSize: '1.2rem',
  margin: '0 auto 30px auto',
  maxWidth: '600px',
  lineHeight: '1.6',
  opacity: '0.9'
};

const sanctumInfoStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  flexWrap: 'wrap'
};

const sanctumBadgeStyles = {
  background: 'linear-gradient(45deg, #8b4513, #a0522d)',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '25px',
  fontSize: '1rem',
  fontWeight: 'bold',
  border: '2px solid #ffd700'
};

const creatureCountStyles = {
  background: 'rgba(255, 215, 0, 0.1)',
  color: '#ffd700',
  padding: '10px 20px',
  borderRadius: '25px',
  fontSize: '1rem',
  fontWeight: 'bold',
  border: '2px solid #ffd700'
};

const filtersContainerStyles = {
  background: 'linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%)',
  padding: '30px 20px',
  borderBottom: '1px solid #dee2e6'
};

const filtersWrapperStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  flexWrap: 'wrap',
  maxWidth: '1200px',
  margin: '0 auto 20px auto'
};

const filterGroupStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: '150px'
};

const filterLabelStyles = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#333'
};

const filterSelectStyles = {
  padding: '10px 15px',
  border: '2px solid #ddd',
  borderRadius: '8px',
  fontSize: '1rem',
  background: '#fff',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease'
};

const resultsCountStyles = {
  textAlign: 'center',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#6c757d'
};

const gridContainerStyles = {
  padding: '40px 20px',
  background: '#f8f9fa'
};

const creaturesGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '30px',
  maxWidth: '1400px',
  margin: '0 auto'
};

const getCreatureCardStyles = (creature) => ({
  background: '#fff',
  borderRadius: '16px',
  boxShadow: creature.isOwned 
    ? '0 8px 25px rgba(40, 167, 69, 0.2)' 
    : '0 8px 25px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  border: creature.isOwned ? '3px solid #28a745' : '3px solid transparent',
  cursor: 'pointer'
});

const creatureImageContainerStyles = {
  position: 'relative',
  height: '250px',
  overflow: 'hidden'
};

const creatureImageStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease'
};

const ownedBadgeStyles = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  background: 'linear-gradient(45deg, #28a745, #34ce57)',
  color: '#fff',
  padding: '5px 12px',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
};

const getTierBadgeStyles = (tier) => {
  const tierColors = {
    'Protector': '#17a2b8',
    'Regent': '#6f42c1',
    'Shield': '#fd7e14',
    'Champion': '#dc3545',
    'Dissonant': '#6c757d'
  };
  
  return {
    position: 'absolute',
    top: '15px',
    left: '15px',
    background: tierColors[tier] || '#6c757d',
    color: '#fff',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  };
};

const creatureInfoStyles = {
  padding: '25px'
};

const creatureNameStyles = {
  fontSize: '1.4rem',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  color: '#2c3e50'
};

const creatureSpeciesStyles = {
  fontSize: '1rem',
  color: '#6c757d',
  margin: '0 0 20px 0'
};

const statsContainerStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
  gap: '10px',
  marginBottom: '20px',
  padding: '15px',
  background: '#f8f9fa',
  borderRadius: '8px'
};

const statRowStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const statLabelStyles = {
  fontSize: '0.9rem',
  color: '#6c757d',
  fontWeight: '500'
};

const statValueStyles = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#2c3e50'
};

const getRarityStyles = (rarity) => {
  const rarityColors = {
    'Common': '#6c757d',
    'Uncommon': '#28a745',
    'Rare': '#007bff',
    'Epic': '#6f42c1',
    'Legendary': '#fd7e14'
  };
  
  return {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: rarityColors[rarity] || '#6c757d'
  };
};

const attributesContainerStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '10px',
  marginBottom: '15px'
};

const attributeStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  background: 'linear-gradient(135deg, #e9ecef, #f8f9fa)',
  borderRadius: '8px',
  border: '1px solid #dee2e6'
};

const attributeLabelStyles = {
  fontSize: '0.8rem',
  color: '#6c757d',
  fontWeight: 'bold',
  marginBottom: '4px'
};

const attributeValueStyles = {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#2c3e50'
};

const descriptionStyles = {
  fontSize: '0.9rem',
  color: '#6c757d',
  lineHeight: '1.5',
  marginBottom: '20px',
  fontStyle: 'italic'
};

const actionContainerStyles = {
  textAlign: 'center'
};

const acquireButtonStyles = {
  background: 'linear-gradient(45deg, #007bff, #0056b3)',
  color: '#fff',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '25px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)'
};

const ownedStatusStyles = {
  color: '#28a745',
  fontSize: '1rem',
  fontWeight: 'bold',
  padding: '12px 24px',
  background: 'rgba(40, 167, 69, 0.1)',
  borderRadius: '25px',
  border: '2px solid #28a745'
};

const lockedStatusStyles = {
  color: '#6c757d',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  padding: '12px 24px',
  background: 'rgba(108, 117, 125, 0.1)',
  borderRadius: '25px',
  border: '2px solid #6c757d'
};

const noResultsStyles = {
  textAlign: 'center',
  padding: '60px 20px',
  color: '#6c757d'
};

// Add CSS animations
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .creatures-grid > div:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2) !important;
    }
    
    .creatures-grid > div:hover img {
      transform: scale(1.05) !important;
    }
    
    @media (max-width: 768px) {
      .creatures-grid {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
      }
      
      .filters-wrapper {
        flex-direction: column !important;
        align-items: center !important;
        gap: 15px !important;
      }
      
      .hero h1 {
        font-size: 2rem !important;
      }
      
      .sanctum-info {
        flex-direction: column !important;
        align-items: center !important;
        gap: 15px !important;
      }
    }
    
    @media (max-width: 480px) {
      .creatures-grid {
        grid-template-columns: 1fr !important;
        padding: 20px 10px !important;
      }
      
      .creature-card {
        margin: 0 10px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Gallery;