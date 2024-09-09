/**
 * @file taskController.js
 * @description Controller for handling task-related logic, such as retrieving, creating, updating, and deleting tasks.
 */

const Task = require("../models/taskModel");
const jwt = require('jsonwebtoken');
const secretKey = 'your_jwt_secret';

/**
 * Get all tasks.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object to send status and data.
 */
exports.getAllTasks = (req, res) => {
  Task.getAll((err, tasks) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(tasks);
  });
};

/**
 * Get a task by its ID.
 * @param {Object} req - Request object containing the task ID in the URL.
 * @param {Object} res - Response object to send status and data.
 */
exports.getTaskById = (req, res) => {
  Task.getById(req.params.id, (err, task) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(task);
  });
};

/**
 * Create a new task.
 * @param {Object} req - Request object containing task data in the body.
 * @param {Object} res - Response object to send status and data.
 */
exports.createTask = (req, res) => {
  const newTask = new Task(req.body);
  Task.create({ ...newTask, user_id: getCurrentUserId(req) }, (err, taskId) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: taskId, ...newTask, user_id: getCurrentUserId(req) });
  });
};

/**
 * Update an existing task by its ID.
 * @param {Object} req - Request object containing the task ID in the URL and updated task data in the body.
 * @param {Object} res - Response object to send status and data.
 */
exports.updateTask = (req, res) => {
  const updatedTask = new Task(req.body.task);
  Task.update(req.params.id, updatedTask, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("Task updated successfully");
  });
};

/**
 * Delete a task by its ID.
 * @param {Object} req - Request object containing the task ID in the URL.
 * @param {Object} res - Response object to send status and data.
 */
exports.deleteTask = (req, res) => {
  Task.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("Task deleted successfully");
  });
};

/**
 * Get tasks by user ID.
 * @param {Object} req - Request object containing the user ID in the URL.
 * @param {Object} res - Response object to send status and data.
 */
exports.getTasksByUserId = (req, res) => {
  Task.getTasksByUserId(getCurrentUserId(req), (err, tasks) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(tasks);
  });
};

/**
 * Extract the current user ID from the JWT token.
 * @param {Object} req - Request object containing the Authorization header.
 * @returns {number} - Decoded user ID.
 */
const getCurrentUserId = (req) => {
  const authHeader = req.headers['authorization']; // Retrieve the Authorization header
  const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header
  const decoded = jwt.verify(token, secretKey); // Decode the token
  return decoded.id; // Return the user ID from the token
};
