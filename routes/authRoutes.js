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

module.exports = router;