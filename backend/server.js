/**
 * @file app.js
 * @description Main server file for the task management application. 
 * This file sets up the Express application, connects to the database, 
 * and defines routes for tasks and authentication. Additionally, it ensures 
 * the necessary database tables are created if they do not already exist.
 */

// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const cors = require('cors'); // Middleware to enable CORS (Cross-Origin Resource Sharing)
const app = express(); // Initialize the Express application
const port = 3000; // Define the port the server will run on

// Import routes and middleware
const taskRoutes = require('./routes/taskRoutes'); // Routes related to task operations
const authRoutes = require('./routes/authRoutes'); // Routes related to authentication
const db = require('./config/db'); // Database connection setup (MySQL)
const verifyToken = require('./middlewares/authMiddlware'); // JWT middleware for token verification

// Middleware setup
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors({ origin: 'http://localhost:5173' })); // Enable CORS for the frontend running on port 5173

// Routes setup
app.use('/tasks', verifyToken, taskRoutes); // Protect task routes with JWT verification
app.use('/auth', authRoutes); // Authentication routes (e.g., login, register)

// SQL queries for table creation

/**
 * SQL query to create the 'tasks' table if it doesn't already exist.
 * The 'tasks' table stores task data including title, description, completion status, and user association.
 */
const createTasksTable = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    user_id INT NOT NULL
  )
`;

/**
 * SQL query to create the 'users' table if it doesn't already exist.
 * The 'users' table stores user data including email and password.
 */
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

// Execute the queries to ensure tables exist
db.query(createTasksTable, (err, result) => {
  if (err) throw err;
  console.log('Tasks table created or already exists');
});

db.query(createUsersTable, (err, result) => {
  if (err) throw err;
  console.log('Users table created or already exists');
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
