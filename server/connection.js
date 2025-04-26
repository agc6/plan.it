const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:5000/planit.fci45.mongodb.net";

// Connect to MongoDB
mongoose.connect(mongoURI)

  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

module.exports = mongoose;
