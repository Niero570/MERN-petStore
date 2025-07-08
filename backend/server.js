const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const express = require('express');
const petRoutes = require('./routes/pets');


// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
// Serve static images from the frontend public folder
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Add CORS headers for images
app.use('/images', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});





// connect to MongoDB
mongoose.set('strictPopulate', false);
mongoose.connect(process.env.dbURI).then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));


//routes
app.use('/api/pets', petRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);




