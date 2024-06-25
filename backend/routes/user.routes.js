const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password }); // Log login attempt

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).send("Login successful!");
    } else {
      res.status(400).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
