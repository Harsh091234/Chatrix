const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const connectToMongoDB = async () => {
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectToMongoDB;
