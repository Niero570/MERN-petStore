const mongoose = require('mongoose');
const Pet = require('./models/petModel'); // Adjust path as needed
require('dotenv').config();

const petData = [
    // === CHIMP EVOLUTION LINE ===
    {
        name: "Forest Chimp",
        species: "Primate",
        tier: "Protector",
        type: "Earth",
        hp: 120,
        attack: 45,
        special: "Vine Swing",
        specialDamage: 35,
        heal: 15,
        speed: 70,
        baseAttributes: {
            aggression: 25,
            intuition: 85,
            intimidation: 15,
            intensity: 40
        },
        prestigeValue: 100,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Curious Scout",
        dissonanceDescription: "Becomes a primitive berserker, losing all intelligence in favor of raw fury",
        lore: "An infant chimp with remarkable intelligence and curiosity. Despite its small size, it shows potential for extraordinary growth when properly bonded. CRITICAL: Must be bonded during infancy - adults become uncontrollably dangerous.",
        description: "A playful young primate with surprising wisdom in its gentle eyes",
        origin_story: "Found orphaned in ancient jungle ruins, this chimp displays unusual intelligence and an uncanny ability to learn human gestures.",
        image: "/images/proChimp.png",
        rarity: "Common",
        pack_series: "Primal Bonds"
    },
    {
        name: "Flame Warlord",
        species: "Primate",
        tier: "Dissonant",
        type: "Fire",
        hp: 450,
        attack: 280,
        special: "Inferno Rage",
        specialDamage: 320,
        heal: 0,
        speed: 85,
        baseAttributes: {
            aggression: 95,
            intuition: 60,
            intimidation: 90,
            intensity: 85
        },
        prestigeValue: 2500,
        sanctumRequirement: "Apex Sanctum",
        sanctumRole: "Berserker Alpha",
        dissonanceDescription: "A terrifying fusion of primal intelligence and elemental fury, wielding ancient weapons wreathed in eternal flame",
        lore: "The final evolution of the Forest Chimp represents the dangerous peak of bonded growth. Intellect and savagery merge into something beyond nature's intention.",
        description: "A massive ape warrior wreathed in flames, bearing mystical weapons of incredible power",
        origin_story: "When the bond reaches critical intensity, the chimp's consciousness fractures, becoming something that remembers being human while embracing primal fury.",
        image: "/images/disChimp.png",
        rarity: "Legendary",
        pack_series: "Primal Bonds"
    },

    // === TIGER EVOLUTION LINE ===
    {
        name: "Golden Tiger",
        species: "Feline",
        tier: "Protector",
        type: "Earth",
        hp: 140,
        attack: 65,
        special: "Pounce Strike",
        specialDamage: 55,
        heal: 10,
        speed: 80,
        baseAttributes: {
            aggression: 70,
            intuition: 50,
            intimidation: 60,
            intensity: 55
        },
        prestigeValue: 100,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Silent Hunter",
        dissonanceDescription: "Becomes a creature of pure predatory instinct, losing all restraint and mercy",
        lore: "A magnificent tiger with unusual golden markings. Its calm demeanor masks incredible hunting instincts waiting to be unleashed.",
        description: "A majestic tiger with piercing amber eyes and distinctive golden stripes",
        origin_story: "Born during a rare celestial alignment, this tiger bears markings that seem to shift and glow in moonlight.",
        image: "/images/proTiger.jpeg",
        rarity: "Uncommon",
        pack_series: "Apex Predators"
    },
    {
        name: "Inferno Tiger",
        species: "Feline",
        tier: "Dissonant",
        type: "Fire",
        hp: 380,
        attack: 240,
        special: "Blazing Maul",
        specialDamage: 290,
        heal: 0,
        speed: 90,
        baseAttributes: {
            aggression: 90,
            intuition: 45,
            intimidation: 85,
            intensity: 80
        },
        prestigeValue: 2500,
        sanctumRequirement: "Apex Sanctum",
        sanctumRole: "Flame Stalker",
        dissonanceDescription: "A being of living fire that hunts not for food, but for the pure joy of the kill",
        lore: "The bonding process has transformed this tiger into something beyond mortal flesh - a creature of pure elemental fury that leaves trails of flame in its wake.",
        description: "A massive tiger wreathed in cosmic flames, with eyes like burning stars",
        origin_story: "At the moment of final bonding, the tiger's spirit merged with primordial fire, becoming a legend that burns across dimensions.",
        image: "/images/disTiger.jpeg",
        rarity: "Legendary",
        pack_series: "Apex Predators"
    },

    // === POLAR BEAR EVOLUTION LINE ===
    {
        name: "Arctic Bear",
        species: "Bear",
        tier: "Protector",
        type: "Water",
        hp: 180,
        attack: 55,
        special: "Ice Slam",
        specialDamage: 45,
        heal: 25,
        speed: 45,
        baseAttributes: {
            aggression: 40,
            intuition: 60,
            intimidation: 70,
            intensity: 50
        },
        prestigeValue: 100,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Gentle Giant",
        dissonanceDescription: "Becomes a mindless force of nature, bringing eternal winter wherever it roams",
        lore: "A peaceful polar bear with an unusual connection to arctic storms. Despite its size, it shows remarkable gentleness toward its bonded partner.",
        description: "A massive but gentle polar bear with fur that sparkles like fresh snow",
        origin_story: "This bear emerged from a blizzard that lasted three days, walking calmly through the storm as if it belonged to the weather itself.",
        image: "/images/proPolar.jpeg",
        rarity: "Uncommon",
        pack_series: "Elemental Guardians"
    },
    {
        name: "Storm Bear",
        species: "Bear",
        tier: "Dissonant",
        type: "Air",
        hp: 420,
        attack: 200,
        special: "Lightning Maul",
        specialDamage: 250,
        heal: 50,
        speed: 60,
        baseAttributes: {
            aggression: 75,
            intuition: 70,
            intimidation: 95,
            intensity: 85
        },
        prestigeValue: 2500,
        sanctumRequirement: "Apex Sanctum",
        sanctumRole: "Storm Caller",
        dissonanceDescription: "A living tempest in bear form, commanding lightning and bringing destruction with each thunderous step",
        lore: "The Arctic Bear's final evolution merges its gentle nature with the raw power of arctic storms, creating a being of terrible beauty and unstoppable force.",
        description: "A colossal bear crackling with lightning, surrounded by swirling aurora and storms",
        origin_story: "When the bond reached its peak, the bear called down the fury of the northern lights, becoming one with the eternal storm.",
        image: "/images/disPolar.png",
        rarity: "Legendary",
        pack_series: "Elemental Guardians"
    },

    // === EAGLE EVOLUTION LINE ===
    {
        name: "Golden Eagle",
        species: "Raptor",
        tier: "Protector",
        type: "Air",
        hp: 100,
        attack: 70,
        special: "Dive Bomb",
        specialDamage: 65,
        heal: 5,
        speed: 95,
        baseAttributes: {
            aggression: 65,
            intuition: 80,
            intimidation: 55,
            intensity: 70
        },
        prestigeValue: 100,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Sky Sentinel",
        dissonanceDescription: "Becomes a creature of pure vengeance, raining fire from the heavens",
        lore: "A majestic eagle with exceptional hunting prowess and an almost supernatural ability to read air currents and weather patterns.",
        description: "A proud golden eagle with piercing eyes that seem to see across vast distances",
        origin_story: "This eagle was found nesting atop an ancient spire, its eggs glowing with inner light during the autumn equinox.",
        image: "/images/proEagle.jpeg",
        rarity: "Common",
        pack_series: "Sky Dominion"
    },
    {
        name: "Phoenix Lord",
        species: "Raptor",
        tier: "Dissonant",
        type: "Fire",
        hp: 320,
        attack: 280,
        special: "Rebirth Flame",
        specialDamage: 300,
        heal: 100,
        speed: 98,
        baseAttributes: {
            aggression: 80,
            intuition: 90,
            intimidation: 75,
            intensity: 95
        },
        prestigeValue: 2500,
        sanctumRequirement: "Apex Sanctum",
        sanctumRole: "Eternal Flame",
        dissonanceDescription: "An immortal being of pure fire that dies and is reborn in each battle, growing stronger with each cycle",
        lore: "The Golden Eagle's ultimate transformation transcends mortality itself. Death becomes merely another tool in its arsenal.",
        description: "A magnificent phoenix wreathed in cosmic flames, eternally dying and being reborn",
        origin_story: "At the moment of perfect bonding, the eagle chose to burn away its mortal form, becoming a symbol of eternal renewal and unstoppable will.",
        image: "/images/disEagle.jpeg",
        rarity: "Legendary",
        pack_series: "Sky Dominion"
    },

    // === WOLF EVOLUTION LINE ===
    {
        name: "Wolf Pup",
        species: "Canine",
        tier: "Protector",
        type: "Earth",
        hp: 90,
        attack: 40,
        special: "Pack Call",
        specialDamage: 30,
        heal: 20,
        speed: 75,
        baseAttributes: {
            aggression: 30,
            intuition: 75,
            intimidation: 25,
            intensity: 45
        },
        prestigeValue: 100,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Loyal Companion",
        dissonanceDescription: "Becomes a creature of shadow and nightmare, hunting in eternal darkness",
        lore: "A young wolf with unusually keen instincts and a deep capacity for loyalty. Its howl can be heard across vast distances by those it considers family. CRITICAL: Must be bonded during infancy - adults become uncontrollably dangerous.",
        description: "An adorable wolf pup with bright blue eyes full of intelligence and devotion",
        origin_story: "Found during a winter storm, this pup showed no fear of humans and seemed to understand complex emotions from its first day.",
        image: "/images/proWolf.jpeg",
        rarity: "Common",
        pack_series: "Pack Brotherhood"
    },
    {
        name: "Shadow Wolf",
        species: "Canine",
        tier: "Dissonant",
        type: "Earth",
        hp: 350,
        attack: 220,
        special: "Void Hunt",
        specialDamage: 260,
        heal: 30,
        speed: 85,
        baseAttributes: {
            aggression: 85,
            intuition: 95,
            intimidation: 90,
            intensity: 80
        },
        prestigeValue: 2500,
        sanctumRequirement: "Apex Sanctum",
        sanctumRole: "Night Terror",
        dissonanceDescription: "A creature that hunts not in this world, but between worlds, stalking prey across dimensions",
        lore: "The Wolf Pup's evolution into shadow represents the dark side of absolute loyalty - a bond so strong it transcends reality itself.",
        description: "A massive black wolf with burning amber eyes, partially phased between dimensions",
        origin_story: "When the bond reached its peak, the pup chose to sacrifice its physical form to become a guardian that exists wherever its partner might need protection.",
        image: "/images/disWolf.jpeg",
        rarity: "Legendary",
        pack_series: "Pack Brotherhood"
    },

    // === STANDALONE POWERFUL CREATURES ===
    {
        name: "Royal Lion",
        species: "Feline",
        tier: "Champion",
        type: "Fire",
        hp: 300,
        attack: 180,
        special: "Kingly Roar",
        specialDamage: 200,
        heal: 40,
        speed: 70,
        baseAttributes: {
            aggression: 75,
            intuition: 70,
            intimidation: 95,
            intensity: 80
        },
        prestigeValue: 1000,
        sanctumRequirement: "Prime Sanctum",
        sanctumRole: "Apex Ruler",
        dissonanceDescription: "Becomes a tyrant king whose roar commands armies of flame",
        lore: "A magnificent lion with a crown that seems to be made of living fire. Its very presence commands respect from all other creatures.",
        description: "A majestic lion with a flaming crown and eyes that burn with royal authority",
        origin_story: "Born during a solar eclipse, this lion bears a crown that appeared the moment it first roared, marking it as royalty among all beasts.",
        image: "/images/proLion.jpeg",
        rarity: "Epic",
        pack_series: "Royal Bloodlines"
    },
    {
        name: "Flame Lion",
        species: "Feline",
        tier: "Dissonant",
        type: "Fire",
        hp: 400,
        attack: 260,
        special: "Solar Flare",
        specialDamage: 320,
        heal: 0,
        speed: 75,
        baseAttributes: {
            aggression: 90,
            intuition: 65,
            intimidation: 100,
            intensity: 95
        },
        prestigeValue: 2500,
        sanctumRequirement: "Apex Sanctum",
        sanctumRole: "Fire Emperor",
        dissonanceDescription: "An eternal ruler wreathed in cosmic flames, commanding the very essence of fire itself",
        lore: "The Royal Lion's ultimate evolution transcends earthly kingship, becoming a divine emperor of flame whose word is law across all realms of fire.",
        description: "A colossal lion made of living cosmic fire, with a crown of burning stars",
        origin_story: "At the moment of perfect bonding, the lion chose to become one with the sun itself, ruling over all flame as an immortal emperor.",
        image: "/images/disLion.jpeg",
        rarity: "Legendary",
        pack_series: "Royal Bloodlines"
    },
    {
        name: "Celestial Flamingo",
        species: "Avian",
        tier: "Shield",
        type: "Water",
        hp: 180,
        attack: 90,
        special: "Healing Waters",
        specialDamage: 70,
        heal: 80,
        speed: 85,
        baseAttributes: {
            aggression: 20,
            intuition: 90,
            intimidation: 40,
            intensity: 70
        },
        prestigeValue: 500,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Sacred Healer",
        dissonanceDescription: "Becomes a bringer of false peace, luring victims with beauty before draining their life force",
        lore: "A graceful flamingo with an otherworldly pink hue that seems to shift and shimmer. Its presence brings peace and its touch can heal wounds.",
        description: "An elegant flamingo with iridescent pink feathers that glow with inner light",
        origin_story: "This flamingo appeared at a sacred lake during a lunar eclipse, its feathers catching moonbeams and turning them into healing light.",
        image: "/images/proPink.png",
        rarity: "Rare",
        pack_series: "Mystic Waters"
    },
    {
        name: "Phoenix Flamingo",
        species: "Avian",
        tier: "Dissonant",
        type: "Fire",
        hp: 280,
        attack: 150,
        special: "Eternal Rebirth",
        specialDamage: 180,
        heal: 120,
        speed: 90,
        baseAttributes: {
            aggression: 40,
            intuition: 95,
            intimidation: 60,
            intensity: 85
        },
        prestigeValue: 2500,
        sanctumRequirement: "Apex Sanctum",
        sanctumRole: "Eternal Guardian",
        dissonanceDescription: "A being of infinite regeneration that feeds on the life force of others to fuel its immortal flames",
        lore: "The Celestial Flamingo's evolution into phoenix form represents the duality of healing and destruction - life eternal requires sacrifice.",
        description: "A magnificent flamingo wreathed in gentle flames of rebirth and renewal",
        origin_story: "When the flamingo chose to embrace its deepest power, it became a creature that could grant immortality at the cost of others' mortality.",
        image: "/images/disPink.jpeg",
        rarity: "Legendary",
        pack_series: "Mystic Waters"
    },
    {
        name: "Arabian Unicorn",
        species: "Equine",
        tier: "Regent",
        type: "Earth",
        hp: 200,
        attack: 120,
        special: "Dark Magic",
        specialDamage: 140,
        heal: 60,
        speed: 80,
        baseAttributes: {
            aggression: 50,
            intuition: 85,
            intimidation: 70,
            intensity: 75
        },
        prestigeValue: 250,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Mystic Guardian",
        dissonanceDescription: "Becomes a creature of pure darkness, corrupting all it touches with shadowy magic",
        lore: "A rare black unicorn with a horn that seems to absorb light. Unlike its pure cousins, this unicorn draws power from shadows and secrets.",
        description: "A majestic black unicorn with a spiraling horn and flowing midnight mane",
        origin_story: "Born during a solar eclipse when day became night, this unicorn emerged from the darkness between worlds.",
        image: "/images/proArabian.jpeg",
        rarity: "Epic",
        pack_series: "Mythic Legends"
    },
    {
        name: "Cosmic Unicorn",
        species: "Equine",
        tier: "Champion",
        type: "Air",
        hp: 280,
        attack: 160,
        special: "Stellar Burst",
        specialDamage: 200,
        heal: 80,
        speed: 90,
        baseAttributes: {
            aggression: 60,
            intuition: 95,
            intimidation: 80,
            intensity: 85
        },
        prestigeValue: 1000,
        sanctumRequirement: "Prime Sanctum",
        sanctumRole: "Star Walker",
        dissonanceDescription: "Becomes a living constellation, rewriting reality with starlight and cosmic will",
        lore: "The Arabian Unicorn's evolution transcends earthly magic, becoming a being that walks between stars and shapes reality with pure will.",
        description: "A celestial unicorn whose body contains swirling galaxies and whose horn channels starlight",
        origin_story: "At the moment of perfect bonding, the unicorn chose to merge with the cosmic void, becoming a bridge between mortal and divine realms.",
        image: "/images/disArabian.jpeg",
        rarity: "Legendary",
        pack_series: "Mythic Legends"
    },
    {
        name: "Noble Steed",
        species: "Equine",
        tier: "Shield",
        type: "Earth",
        hp: 220,
        attack: 100,
        special: "Gallant Charge",
        specialDamage: 120,
        heal: 50,
        speed: 85,
        baseAttributes: {
            aggression: 55,
            intuition: 75,
            intimidation: 65,
            intensity: 70
        },
        prestigeValue: 500,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Loyal Mount",
        dissonanceDescription: "Becomes a war horse of terrifying power, trampling enemies beneath its hooves",
        lore: "A magnificent white horse with ornate tack and an noble bearing. Its loyalty is absolute and its courage unwavering in battle.",
        description: "A beautiful white horse with elegant riding gear and kind, intelligent eyes",
        origin_story: "Once the mount of a legendary knight, this horse chose to continue serving even after its rider's passing.",
        image: "/images/proArabian.jpeg",
        rarity: "Rare",
        pack_series: "Knights & Steeds"
    },
    {
        name: "Gentle Panda",
        species: "Bear",
        tier: "Protector",
        type: "Earth",
        hp: 160,
        attack: 35,
        special: "Bamboo Heal",
        specialDamage: 25,
        heal: 60,
        speed: 40,
        baseAttributes: {
            aggression: 15,
            intuition: 80,
            intimidation: 30,
            intensity: 40
        },
        prestigeValue: 100,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Peaceful Guardian",
        dissonanceDescription: "Becomes a creature of unstoppable rage, its gentle nature twisted into berserker fury",
        lore: "A peaceful panda with an extraordinary capacity for healing and an almost supernatural calm that affects all creatures around it.",
        description: "An adorable panda with wise eyes and a naturally calming presence",
        origin_story: "Found meditating in a bamboo grove, this panda seemed to radiate peace and brought harmony wherever it went.",
        image: "/images/proPanda.jpeg",
        rarity: "Common",
        pack_series: "Zen Gardens"
    },
    {
        name: "Fire Panda",
        species: "Bear",
        tier: "Regent",
        type: "Fire",
        hp: 200,
        attack: 85,
        special: "Flame Burst",
        specialDamage: 100,
        heal: 40,
        speed: 55,
        baseAttributes: {
            aggression: 45,
            intuition: 70,
            intimidation: 55,
            intensity: 60
        },
        prestigeValue: 250,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Balanced Warrior",
        dissonanceDescription: "Becomes a creature of controlled fury, balancing destruction with wisdom",
        lore: "The Gentle Panda's evolution represents the balance between peace and necessary action - sometimes violence serves the greater good.",
        description: "A red panda with fur that flickers like flame and eyes that burn with quiet intensity",
        origin_story: "When forced to defend its grove, the panda discovered that sometimes peace requires the strength to fight for what matters.",
        image: "/images/disPanda.jpeg",
        rarity: "Uncommon",
        pack_series: "Zen Gardens"
    },
    {
        name: "Savanna Giraffe",
        species: "Ungulate",
        tier: "Protector",
        type: "Earth",
        hp: 150,
        attack: 50,
        special: "High Strike",
        specialDamage: 40,
        heal: 30,
        speed: 60,
        baseAttributes: {
            aggression: 25,
            intuition: 85,
            intimidation: 45,
            intensity: 35
        },
        prestigeValue: 100,
        sanctumRequirement: "Alpha Sanctum",
        sanctumRole: "Gentle Giant",
        dissonanceDescription: "Becomes a towering monster whose very height becomes a weapon of terror",
        lore: "A gentle giraffe with an unusual pattern and extraordinary awareness. Its height allows it to see dangers long before they arrive.",
        description: "A graceful giraffe with distinctive spotted patterns and remarkably expressive eyes",
        origin_story: "This giraffe was born during a great migration, marked with patterns that seem to map the stars themselves.",
        image: "/images/proGiraffe.jpeg",
        rarity: "Common",
        pack_series: "African Majesty"
    },
    {
        name: "Girragon",
        species: "Ungulate",
        tier: "Dissonant",
        type: "Fire",
        hp: 380,
        attack: 200,
        special: "Draco Breath",
        specialDamage: 280,
        heal: 60,
        speed: 70,
        baseAttributes: {
            aggression: 70,
            intuition: 90,
            intimidation: 85,
            intensity: 75
        },
        prestigeValue: 2500,
        sanctumRequirement: "Apex Sanctum",
        sanctumRole: "Sky Dragon",
        dissonanceDescription: "A chimeric being that combines the grace of a giraffe with the terrible power of an ancient dragon",
        lore: "The Savanna Giraffe's ultimate evolution transcends its earthly form, sprouting wings and breathing fire while retaining its gentle soul.",
        description: "A magnificent giraffe with dragon wings, breathing cosmic fire from its great height",
        origin_story: "At the moment of perfect bonding, ancient dragon magic awakened in the giraffe's blood, transforming it into a creature of legend.",
        image: "/images/disGirragon.jpeg",
        rarity: "Legendary",
        pack_series: "African Majesty"
    }
];

async function seedPets() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://niero570:pets@cluster1.loqbfvw.mongodb.net/');
        console.log('Connected to MongoDB');

        // Clear existing pets (optional - remove if you want to keep existing data)
        await Pet.deleteMany({});
        console.log('Cleared existing pets');

        // Insert new pets
        const insertedPets = await Pet.insertMany(petData);
        console.log(`Successfully seeded ${insertedPets.length} pets`);

        // Display summary
        const tierCounts = {};
        const typeCounts = {};
        const rarityCounts = {};

        insertedPets.forEach(pet => {
            tierCounts[pet.tier] = (tierCounts[pet.tier] || 0) + 1;
            typeCounts[pet.type] = (typeCounts[pet.type] || 0) + 1;
            rarityCounts[pet.rarity] = (rarityCounts[pet.rarity] || 0) + 1;
        });

        console.log('\n=== SEEDING SUMMARY ===');
        console.log('Tiers:', tierCounts);
        console.log('Types:', typeCounts);
        console.log('Rarities:', rarityCounts);
        
        console.log('\n=== EVOLUTION LINES ===');
        console.log('🐵 Chimp → Fire Warlord');
        console.log('🐅 Golden Tiger → Inferno Tiger');
        console.log('🐻 Arctic Bear → Storm Bear');
        console.log('🦅 Golden Eagle → Phoenix Lord');
        console.log('🐺 Wolf Pup → Shadow Wolf');
        console.log('🦩 Celestial Flamingo → Phoenix Flamingo');
        console.log('🦄 Shadow Unicorn → Cosmic Unicorn');
        console.log('🐼 Gentle Panda → Fire Panda');
        console.log('🦒 Savanna Giraffe → Dragon Giraffe');
        console.log('🦁 Royal Lion → Flame Lion');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding pets:', error);
        process.exit(1);
    }
}

// Run the seeder

    seedPets();


module.exports = { seedPets, petData };