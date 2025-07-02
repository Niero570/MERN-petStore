const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    // Core Identity
    name: { type: String, required: true, trim: true },
    species: { type: String, required: true }, 
    tier: { type: String, required: true, enum: ['Protector', 'Regent', 'Shield', 'Champion', 'Dissonant'] },
    type: { type: String, required: true }, // (Elementals) Fire, Water, Earth, air.
    
    //  Stats  for battle calculations
    hp: { type: Number, required: true, min: 1, max: 1000 },
    attack: { type: Number, required: true, min: 1, max: 500 },
    special: { type: String, required: true },
    specialDamage: { type: Number, required: true, min: 0 },
    heal: { type: Number, default: 0, min: 0 },
    speed: { type: Number, default: 50, min: 1, max: 100 },
    
    // Psychological Attributes (the new system)
    baseAttributes: {
        aggression: { type: Number, required: true, min: 1, max: 100 },
        intuition: { type: Number, required: true, min: 1, max: 100 },
        intimidation: { type: Number, required: true, min: 1, max: 100 },
        intensity: { type: Number, required: true, min: 1, max: 100 }
    },
    
    // Sanctum & Prestige System
    prestigeValue: { type: Number, default: 100 }, // How much prestige this pet adds to collection
    sanctumRequirement: { type: String, enum: ['Alpha Sanctum', 'Prime Sanctum', 'Apex Sanctum'], default: 'Alpha Sanctum' },
    
    // Rich Lore System
    sanctumRole: { type: String }, 
    dissonanceDescription: { type: String }, // What happens at max tier
    lore: { type: String, maxlength: 1000 },
    description: { type: String, maxlength: 200 },
    origin_story: { type: String },
    
    // Visual & Meta
    image: String,
    rarity: { type: String, enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'] },
    pack_series: String,
    featured_in_newsletter: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

//  Enhanced attributes based on tier and sanctum bonuses
petSchema.methods.calculateEnhancedAttributes = function(sanctumTier = 'Alpha Sanctum') {
    const tierMultipliers = {
        'Protector': 1.0,
        'Regent': 1.2,
        'Shield': 1.4, 
        'Champion': 1.6,
        'Dissonant': 2.0
    };
    
    const sanctumBonuses = {
        'Alpha Sanctum': 1.0,
        'Prime Sanctum': 1.3,
        'Apex Sanctum': 1.6
    };
    
    const tierMultiplier = tierMultipliers[this.tier] || 1.0;
    const sanctumBonus = sanctumBonuses[sanctumTier] || 1.0;
    const totalMultiplier = tierMultiplier * sanctumBonus;
    
    return {
        aggression: Math.floor(this.baseAttributes.aggression * totalMultiplier),
        intuition: Math.floor(this.baseAttributes.intuition * totalMultiplier),
        intimidation: Math.floor(this.baseAttributes.intimidation * totalMultiplier),
        intensity: Math.floor(this.baseAttributes.intensity * totalMultiplier),
        totalPower: Math.floor(
            (this.baseAttributes.aggression + this.baseAttributes.intuition + 
             this.baseAttributes.intimidation + this.baseAttributes.intensity) * totalMultiplier
        )
    };
};

// Calculate traditional battle stats for compatibility
petSchema.methods.getBattleStats = function() {
    return {
        hp: this.hp,
        attack: this.attack,
        special: this.special,
        specialDamage: this.specialDamage,
        heal: this.heal,
        speed: this.speed,
        battlePower: this.hp + this.attack + this.specialDamage
    };
};

// Get display information for UI
petSchema.methods.getDisplayInfo = function(sanctumTier) {
    const enhancedAttributes = this.calculateEnhancedAttributes(sanctumTier);
    const battleStats = this.getBattleStats();
    
    return {
        identity: {
            name: this.name,
            species: this.species,
            tier: this.tier,
            type: this.type,
            sanctumRole: this.sanctumRole
        },
        attributes: enhancedAttributes,
        battleStats: battleStats,
        lore: {
            description: this.description,
            lore: this.lore,
            dissonanceDescription: this.dissonanceDescription
        },
        meta: {
            rarity: this.rarity,
            prestigeValue: this.prestigeValue,
            sanctumRequirement: this.sanctumRequirement,
            image: this.image
        }
    };
};

// Pre-save middleware to ensure data consistency
petSchema.pre('save', function(next) {
    
    const tierPrestigeValues = {
        'Protector': 100,
        'Regent': 250,
        'Shield': 500,
        'Champion': 1000,
        'Dissonant': 2500
    };
    
    if (!this.prestigeValue || this.prestigeValue === 100) {
        this.prestigeValue = tierPrestigeValues[this.tier] || 100;
    }
    
    next();
});

module.exports = mongoose.model('Pet', petSchema);