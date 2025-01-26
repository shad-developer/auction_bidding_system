const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected successfully`.bgGreen.white);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
  }
};

module.exports = connectDB;