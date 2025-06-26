const express = require('express');
const router = express.Router();
const Pet = require('../models/petModel');


//GET  PETS
router.get('/', async(req, res) =>{
    try{
        const pets = await Pet.find();
        res.json(pets);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
});


//POST a new PET
router.post('/', async (req, res) =>{
    try {
        const pet = new Pet(req.body);
        const savedPet = await pet.save();
        res.status(201).json(savedPet);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
});


//Read a pet by ID(GET)
router.get('/:id', async (req, res) =>{
    try{
        const pet = await Pet.findById(req.params.id);
        if(!pet) return res.status(404).json({error: 'Pet not found'});
        res.json(pet);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});


//update pet by ID (PUT)
router.put('/:id', async(req, res) =>{
    console.log("Updating pet with ID:", req.params.id);

    try{
        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedPet) return res.status(404).json({message:"Pet not found"});
        res.json(updatedPet);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
});

//Delete pet by ID (DELETE)
router.delete('/:id', async (req, res) =>{
    try{
        const deletedPet = await Pet.findByIdAndDelete(req.params.id);
        if(!deletedPet) return res.status(404).json({message: 'Pet deleted successfully'})
    } catch (err) {
      res.status(500).json({error: err.message});
    
    }
});



module.exports = router;