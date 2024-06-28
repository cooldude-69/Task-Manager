const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("Request Body:", req.body);

  const { email, password } = req.body;
  console.log("Login attempt:", { email, password });

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  try {
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: "Login successful!", token });
    } else {
      console.log("Invalid email or password");
      return res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
