const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

// Update user preferences
router.put("/preferences", auth, async (req, res) => {
  try {
    const { font, outerBackgroundColor, mainBackgroundColor } = req.body;
    
    // Find the user and update preferences
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Update preferences
    user.preferences = {
      font: font || user.preferences.font,
      outerBackgroundColor: outerBackgroundColor || user.preferences.outerBackgroundColor,
      mainBackgroundColor: mainBackgroundColor || user.preferences.mainBackgroundColor
    };
    
    await user.save();
    
    res.json({ message: "Preferences updated successfully", preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user preferences
router.get("/preferences", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json(user.preferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;