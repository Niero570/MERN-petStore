const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const express = require('express');

// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json()); 

//routes
const petRoutes = require('./routes/pets');
app.use('/api/pets', petRoutes);



// test route
app.get('/', (req, res) => {
  res.json({ mssg: "Welcome to the back of the PetShop" });
});



// connect to MongoDB
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));


