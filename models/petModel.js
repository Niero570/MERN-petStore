const mongoose = require('mongoose');
const petSchema = new mongoose.Schema({


    // Validation fields 
    name: { type: String, required: true, trim: true },
    tier: { type: String, required: true, enum: ['Protector', 'Regent', 'Shield', 'Champion ', 'Dissonant'] },
    type: { type: String, required: true },
    hp: { type: Number, required: true, min: 1, max: 1000 },
    attack: { type: Number, required: true, min: 1, max: 500 },
    special: { type: String, required: true },
    specialDamage: { type: Number, required: true, min: 0 },
    heal: { type: Number, default: 0, min: 0 },
    image: String,

    
    // New fields for content/newsletter
    // Rich backstory
    lore: { type: String, maxlength: 1000 },

     // Card flavor text
    description: { type: String, maxlength: 200 },

    // For newsletter features
    origin_story: String, 
    
    // Game balance fields
    speed: { type: Number, default: 50, min: 1, max: 100 },
    rarity: { type: String, enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'] },
    
    // Meta fields
    pack_series: String,
    featured_in_newsletter: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});