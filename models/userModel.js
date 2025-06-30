
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    //authentication fields
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    
    //Pet Collection System
    ownedPets:[{
        petId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet'
        
              },
        acquiredDate: {
                type: Date,
                default: Date.now
    }
}],
    //Battle Schema
    totalBattles: {type: Number, default: 0},
    battlesWon: {type: Number, default: 0 },
    currency: {type: Number, default: 100},
     
    //Newsletters
    newsLetteSubscrbers: {type: Boolean, default: false}

});    


 

module.exports = mongoose.model('User', userSchema);  