const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register User - Updated to include default preferences
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with preferences
    const user = new User({
      name,
      email,
      password: hashedPassword,
      preferences: {
        font: "Arial", // Default font
        outerBackgroundColor: "", // Empty string means use system default
        mainBackgroundColor: ""  // Empty string means use system default
      }
    });

    await user.save();

    // Generate token for automatic login after registration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    // Create user response object without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences
    };

    // Return token and user info for automatic login
    res.status(201).json({ 
      message: "User registered successfully", 
      token, 
      user: userResponse 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// authRoutes.js - Update login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    // Include user object with preferences but exclude password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences
    };
    
    res.json({ token, user: userResponse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;