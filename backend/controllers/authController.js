/**
 * @file authController.js
 * @description Controller for handling user authentication, such as registration and login.
 */

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'your_jwt_secret';

/**
 * Register a new user.
 * @param {Object} req - Request object containing user data in the body.
 * @param {Object} res - Response object to send status and data.
 */
exports.register = (req, res) => {
  const newUser = new User(req.body);
  User.create(newUser, (err, userId) => {
    if (err) {
      if (err === 'User already exists') {
        return res.status(400).send(err);
      }
      return res.status(500).send(err);
    }
    return res.status(201).json({ id: userId });
  });
};

/**
 * Log in an existing user.
 * @param {Object} req - Request object containing user credentials in the body.
 * @param {Object} res - Response object to send status and data.
 */
exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send(err);
      if (!isMatch) return res.status(401).send('Invalid credentials');

      // Generate a JWT token valid for 24 hours
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '24h' });
      res.status(200).json({ token });
    });
  });
};
