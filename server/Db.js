const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {

  try {
    // create a env file and copy paste variables from env.example file
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
