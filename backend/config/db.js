/**
 * @file db.js
 * @description MySQL database configuration and connection setup.
 */

const mysql = require('mysql'); // MySQL module

// Create a MySQL connection object
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Add your MySQL root password here
  database: 'task_manager' // Database name
});

// Establish the connection to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = db; // Export the database connection
