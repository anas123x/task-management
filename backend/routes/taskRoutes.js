/**
 * @file taskRoutes.js
 * @description Defines the routes for task-related operations such as fetching, creating, updating, and deleting tasks.
 * All routes require authentication as they are protected by the JWT middleware in `app.js`.
 */

// Import required modules
const express = require('express');
const router = express.Router(); // Create an Express router instance
const taskController = require('../controllers/taskController'); // Import task controller for handling task-related logic

// Task routes

/**
 * @route GET /tasks
 * @description Fetch all tasks.
 */
router.get('/', taskController.getAllTasks);

/**
 * @route GET /tasks/:id
 * @description Fetch a task by its ID.
 */
router.get('/:id', taskController.getTaskById);

/**
 * @route POST /tasks
 * @description Create a new task.
 */
router.post('/', taskController.createTask);

/**
 * @route PUT /tasks/:id
 * @description Update a task by its ID.
 */
router.put('/:id', taskController.updateTask);

/**
 * @route DELETE /tasks/:id
 * @description Delete a task by its ID.
 */
router.delete('/:id', taskController.deleteTask);

/**
 * @route GET /tasks/user/:user_id
 * @description Fetch tasks by user ID.
 */
router.get('/user/:user_id', taskController.getTasksByUserId);

module.exports = router; // Export the router
