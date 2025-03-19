const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI || "mongodb+srv://planit:planitMongo@planit.fci45.mongodb.net/?retryWrites=true&w=majority&appName=planit";

// Connect to MongoDB
mongoose.connect(mongoURI)

  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

module.exports = mongoose;
