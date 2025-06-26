const mongoose = require('mongoose');


const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    hp: Number,
    attack: Number,
    special: String,
    specialDamage: Number,
    heal: Number,
    image: String


});

module.exports = mongoose.model("Pet", petSchema);