const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();
const port = 3000;
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');

// Middleware
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'})); // Use the cors middleware
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// Create tasks table if it doesn't exist
const createTasksTable = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

db.query(createTasksTable, (err, result) => {
  if (err) throw err;
  console.log('Tasks table created or already exists');
});

db.query(createUsersTable, (err, result) => {
  if (err) throw err;
  console.log('Users table created or already exists');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});