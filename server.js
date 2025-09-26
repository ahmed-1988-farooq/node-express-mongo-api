require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// parse JSON
app.use(express.json());

// simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Routes
const playerRoutes = require('./routes/players');
app.use('/api/players', playerRoutes);

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/playersdb';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));
