const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/userModel');



//Test routes(POST)

router.post('/register', async (req, res) => {
    try {
        const {username, email, password } = req.body;
        const existingUser = await User.findOne({
            $or: [{email}, {username}]
        });

        if (existingUser) {
            return res.status(400).json({
                error: 'User already exsits'
            });
        }

        //Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //New user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'User registration worked',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                currency: user.currency
            }
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Login route
router.post('/login', async (req, res) =>{
    try{
        const {email, password} = req.body;

        //Find user email
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ error: 'Invalid email or password'});
        }

        //Check Password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({error: 'Invalid email or password'});
        }

        //Generate web token
        const token = jwt.sign(
            { userId: user._id},
            'your-secret-key',
            { expiresIn: '7d'}
        );


        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                currency: user.currency
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


//Pet collection routes
router.post('/collect-pet/:petId', async (req, res) =>{
    try{
        const { petId } =  req.params;
        const userId = "685ff36b6e0712a1580c8965"; //test id
        const user = await User.findById(userId);
    if(!user) 
        return res.status(404).json({error:'User not found'});

    const alreadyOwned = user.ownedPets.find(pet => pet.petId.toString() === petId);
    if (alreadyOwned) {
        return res.status(400).json({error: 'Pet already in collection'});
    }

    //Add to collection
    user.ownedPets.push({ petId });
    await user.save();

    res.json({
        success: true,
        message: 'Pet added to collection!',
        totalPets: user.ownedPets.length
    });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) =>{
    try{
        const users = await User.find();
        res.json({message: "Auth routes on point!", users});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//User's pets (for battle)
router.post('/battle/start', async (req, res) =>{
    try {
        const { petId1, petId2 } = req.body;
        const userId = "685ff36b6e0712a1580c8965"; //User test ID


        const user = await User.findById(userId).populate('ownedPets.petId');
        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }


        //Checks to see if user owns both pets
        const ownsPet1 = user.ownedPets.find(pet => pet.petId._id.toString() === petId1);
        const ownsPet2 = user.ownedPets.find(pet => pet.petId._id.toString() === petId2);

        if (!ownsPet1 || !ownsPet2) {
            return res.status(400).json({ error: 'You can only battle with PETS you own' });
        }
   
       res.json ({
        success: true,
        message: 'Battle ready!',
        pet1: ownsPet1.petId,
        pet2: ownsPet2.petId,
        readyToBattle: true
       }); 

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


//Actual battle
// Execute battle
router.post('/battle/execute', async (req, res) => {
    try {
        const { petId1, petId2 } = req.body;
        const userId = "685ff36b6e0712a1580c8965";
        
        const user = await User.findById(userId).populate('ownedPets.petId');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const pet1 = user.ownedPets.find(pet => pet.petId._id.toString() === petId1)?.petId;
        const pet2 = user.ownedPets.find(pet => pet.petId._id.toString() === petId2)?.petId;

        if (!pet1 || !pet2) {
            return res.status(400).json({ error: 'You can only battle with pets you own' });
        }

        const pet1Power = pet1.hp + pet1.attack + pet1.specialDamage;
        const pet2Power = pet2.hp + pet2.attack + pet2.specialDamage;
        
        const winner = pet1Power > pet2Power ? pet1 : pet2;
        const loser = pet1Power > pet2Power ? pet2 : pet1;

        res.json({
            success: true,
            message: 'Battle complete!',
            winner: {
                name: winner.name,
                type: winner.type,
                totalPower: pet1Power > pet2Power ? pet1Power : pet2Power
            },
            loser: {
                name: loser.name,
                type: loser.type,
                totalPower: pet1Power > pet2Power ? pet2Power : pet1Power
            },
            battleSummary: `${winner.name} (${winner.type}) defeats ${loser.name} (${loser.type})!`
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Enhanced Collection with Sanctum System
router.get('/sanctum', async (req, res) => {
    try {
        const userId = "685ff36b6e0712a1580c8965"; // Your test user ID
        
        const user = await User.findById(userId).populate({
            path: 'ownedPets.petId',
            select: 'name species tier type baseAttributes prestigeValue sanctumRequirement image lore description pantheonRole dissonanceDescription rarity'
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate user's total prestige and determine Sanctum tier
        const totalPrestige = user.ownedPets.reduce((total, ownedPet) => {
            return total + (ownedPet.petId.prestigeValue || 100);
        }, 0);

        // Determine Sanctum tier based on prestige
        let sanctumTier = 'Alpha Sanctum';
        let sanctumTitle = 'Pack Leader';
        let capacity = 25;
        let evolutionBonus = 1.0;

        if (totalPrestige >= 10000) {
            sanctumTier = 'Apex Sanctum';
            sanctumTitle = 'Apex Predator';
            capacity = 60;
            evolutionBonus = 1.6;
        } else if (totalPrestige >= 2500) {
            sanctumTier = 'Prime Sanctum';
            sanctumTitle = 'Prime Collector';
            capacity = 40;
            evolutionBonus = 1.3;
        }

        // Organize collection with enhanced attributes
        const enhancedCollection = user.ownedPets.map(ownedPet => {
            const pet = ownedPet.petId;
            const displayInfo = pet.getDisplayInfo(sanctumTier);
            
            return {
                userPetId: ownedPet._id,
                acquiredDate: ownedPet.acquiredDate,
                ...displayInfo
            };
        });

        // Group by tier and type for organized display
        const organizedByTier = enhancedCollection.reduce((acc, pet) => {
            const tier = pet.identity.tier;
            if (!acc[tier]) acc[tier] = [];
            acc[tier].push(pet);
            return acc;
        }, {});

        const organizedByType = enhancedCollection.reduce((acc, pet) => {
            const type = pet.identity.type;
            if (!acc[type]) acc[type] = [];
            acc[type].push(pet);
            return acc;
        }, {});

        // Calculate statistics
        const stats = {
            totalCreatures: enhancedCollection.length,
            totalPrestige: totalPrestige,
            sanctumTier: sanctumTier,
            sanctumTitle: sanctumTitle,
            capacity: capacity,
            evolutionBonus: evolutionBonus,
            utilizationPercentage: Math.round((enhancedCollection.length / capacity) * 100),
            tierDistribution: Object.keys(organizedByTier).reduce((acc, tier) => {
                acc[tier] = organizedByTier[tier].length;
                return acc;
            }, {}),
            averagePrestige: Math.round(totalPrestige / (enhancedCollection.length || 1)),
            nextTierRequirement: sanctumTier === 'Alpha Sanctum' ? 2500 : 
                                sanctumTier === 'Prime Sanctum' ? 10000 : 'Maximum Achieved'
        };

        res.json({
            success: true,
            message: `${sanctumTier} accessed successfully`,
            sanctum: {
                tier: sanctumTier,
                title: sanctumTitle,
                user: {
                    username: user.username,
                    currency: user.currency
                },
                collection: {
                    creatures: enhancedCollection,
                    byTier: organizedByTier,
                    byType: organizedByType,
                    recent: enhancedCollection
                        .sort((a, b) => new Date(b.acquiredDate) - new Date(a.acquiredDate))
                        .slice(0, 5)
                },
                stats: stats
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Enhanced Pets Display with Sanctum Context
router.get('/creatures-catalog', async (req, res) => {
    try {
        const userId = "685ff36b6e0712a1580c8965";
        const Pet = require('../models/petModel');
        
        // Get user's current sanctum tier
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const totalPrestige = user.ownedPets.reduce((total, ownedPet) => total + 100, 0); // Simplified calculation
        let userSanctumTier = 'Alpha Sanctum';
        if (totalPrestige >= 10000) userSanctumTier = 'Apex Sanctum';
        else if (totalPrestige >= 2500) userSanctumTier = 'Prime Sanctum';

        // Get all pets with enhanced display info
        const allPets = await Pet.find();
        const enhancedCatalog = allPets.map(pet => {
            const displayInfo = pet.getDisplayInfo(userSanctumTier);
            const isOwned = user.ownedPets.some(ownedPet => 
                ownedPet.petId.toString() === pet._id.toString()
            );
            
            return {
                ...displayInfo,
                id: pet._id,
                isOwned: isOwned,
                canAcquire: userSanctumTier === pet.sanctumRequirement || 
                           (userSanctumTier === 'Prime Sanctum' && pet.sanctumRequirement === 'Alpha Sanctum') ||
                           (userSanctumTier === 'Apex Sanctum')
            };
        });

        res.json({
            success: true,
            message: 'Creatures catalog loaded',
            catalog: {
                userSanctumTier: userSanctumTier,
                totalAvailable: enhancedCatalog.length,
                creatures: enhancedCatalog,
                byTier: enhancedCatalog.reduce((acc, creature) => {
                    const tier = creature.identity.tier;
                    if (!acc[tier]) acc[tier] = [];
                    acc[tier].push(creature);
                    return acc;
                }, {}),
                acquirable: enhancedCatalog.filter(creature => creature.canAcquire && !creature.isOwned)
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Enhanced Battle Setup with Sanctum Bonuses
router.post('/sanctum-battle/setup', async (req, res) => {
    try {
        const { petId1, petId2 } = req.body;
        const userId = "685ff36b6e0712a1580c8965";

        if (!petId1 || !petId2 || petId1 === petId2) {
            return res.status(400).json({ 
                error: 'Invalid pet selection for battle' 
            });
        }

        const user = await User.findById(userId).populate('ownedPets.petId');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Determine user's sanctum tier
        const totalPrestige = user.ownedPets.reduce((total, ownedPet) => 
            total + (ownedPet.petId.prestigeValue || 100), 0);
        
        let sanctumTier = 'Alpha Sanctum';
        if (totalPrestige >= 10000) sanctumTier = 'Apex Sanctum';
        else if (totalPrestige >= 2500) sanctumTier = 'Prime Sanctum';

        // Get battle participants
        const ownedPet1 = user.ownedPets.find(pet => pet.petId._id.toString() === petId1);
        const ownedPet2 = user.ownedPets.find(pet => pet.petId._id.toString() === petId2);

        if (!ownedPet1 || !ownedPet2) {
            return res.status(400).json({ 
                error: 'You can only battle with creatures from your Sanctum' 
            });
        }

        const pet1 = ownedPet1.petId;
        const pet2 = ownedPet2.petId;

        // Get enhanced battle preview with sanctum bonuses
        const pet1Display = pet1.getDisplayInfo(sanctumTier);
        const pet2Display = pet2.getDisplayInfo(sanctumTier);

        // Calculate battle prediction
        const pet1TotalPower = pet1Display.attributes.totalPower;
        const pet2TotalPower = pet2Display.attributes.totalPower;
        const predictedWinner = pet1TotalPower > pet2TotalPower ? pet1Display : pet2Display;
        const winProbability = Math.round((pet1TotalPower / (pet1TotalPower + pet2TotalPower)) * 100);

        res.json({
            success: true,
            message: `${sanctumTier} battle setup complete`,
            battleSetup: {
                sanctumTier: sanctumTier,
                contestant1: {
                    ...pet1Display,
                    id: pet1._id
                },
                contestant2: {
                    ...pet2Display,
                    id: pet2._id
                },
                battlePreview: {
                    predictedWinner: {
                        name: predictedWinner.identity.name,
                        species: predictedWinner.identity.species,
                        winProbability: predictedWinner === pet1Display ? winProbability : 100 - winProbability
                    },
                    powerDifference: Math.abs(pet1TotalPower - pet2TotalPower),
                    battleType: pet1Display.identity.type === pet2Display.identity.type ? 'same-type' : 'cross-type',
                    sanctumBonus: sanctumTier === 'Apex Sanctum' ? '+60%' : 
                                 sanctumTier === 'Prime Sanctum' ? '+30%' : 'Base'
                }
            },
            readyForBattle: true
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;