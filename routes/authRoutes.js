const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

//Test routes
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Example usage of User model
        res.json({ message: "Auth routes on point!", users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;