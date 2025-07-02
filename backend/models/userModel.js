
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

userSchema.methods.getSanctumInfo = function() {
    const totalPrestige = this.ownedPets.reduce((total, ownedPet) => total + 100, 0);
    
    let sanctumTier = 'Alpha Sanctum';
    let sanctumTitle = 'Pack Leader';
    let capacity = 25;
    
    if (totalPrestige >= 10000) {
        sanctumTier = 'Apex Sanctum';
        sanctumTitle = 'Apex Predator';
        capacity = 60;
    } else if (totalPrestige >= 2500) {
        sanctumTier = 'Prime Sanctum';
        sanctumTitle = 'Prime Collector';
        capacity = 40;
    }
    
    return { sanctumTier, sanctumTitle, capacity, totalPrestige };
};


 

module.exports = mongoose.model('User', userSchema);  