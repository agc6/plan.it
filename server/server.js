require("dotenv").config();
const express = require("express");
const mongoose = require("./connection");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes"); // NEW

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes); // NEW

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Express API");
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));