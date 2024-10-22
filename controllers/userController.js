const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// User registration logic
// userController.js

const registerUser = async (req, res) => {
  try {
      const { email, password, name } = req.body;

      // Ensure all required fields are provided
      if (!email || !password || !name) {
          return res.status(400).json({ error: "All fields (name, email, and password) are required" });
      }

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: "Email is already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({ email, password: hashedPassword, name });
      await user.save();

      // Send success response
      res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
      console.error("Registration Error:", error); // Log the exact error
      res.status(500).json({ error: "Registration failed" });
  }
};


const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Ensure both email and password are provided
      if (!email || !password) {
          return res.status(400).json({ error: 'Both email and password are required' });
      }

      // Check if user exists with the provided email
      const user = await User.findOne({ email });
      if (!user) {
          // Avoid revealing whether the issue was with email or password
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare provided password with stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          // Again, avoid revealing specific details
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token with an expiration time of 1 hour
      const token = jwt.sign(
          { userId: user._id, email: user.email }, 
          process.env.JWT_SECRET, 
          { expiresIn: '1h' }
      );

      // Send the token in the response
      res.json({ token });
  } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { registerUser, loginUser };
