/**
 * @file authRoutes.js
 * @description Defines the routes for user authentication such as registration and login.
 */

// Import required modules
const express = require('express');
const router = express.Router(); // Create an Express router instance
const authController = require('../controllers/authController'); // Import auth controller for handling authentication logic

// Authentication routes

/**
 * @route POST /auth/register
 * @description Register a new user.
 */
router.post('/register', authController.register);

/**
 * @route POST /auth/login
 * @description Log in an existing user.
 */
router.post('/login', authController.login);

module.exports = router; // Export the router
