/**
 * @file Task.js
 * @description Task model that interacts with the MySQL database to handle task-related operations such as creating, fetching, updating, and deleting tasks.
 */

const db = require('../config/db'); // Database connection

class Task {
  /**
   * Task constructor
   * @param {Object} task - Task object containing title, description, completion status, and user_id.
   */
  constructor(task) {
    this.title = task.title;
    this.description = task.description;
    this.completed = task.completed;
    this.user_id = task.user_id;
  }

  /**
   * Fetch all tasks from the database.
   * @param {function} result - Callback function to handle the query result.
   */
  static getAll(result) {
    db.query('SELECT * FROM tasks', (err, res) => {
      if (err) result(err, null);
      result(null, res);
    });
  }

  /**
   * Fetch a task by its ID.
   * @param {number} id - Task ID.
   * @param {function} result - Callback function to handle the query result.
   */
  static getById(id, result) {
    db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, res) => {
      if (err) result(err, null);
      result(null, res[0]);
    });
  }

  /**
   * Create a new task in the database.
   * @param {Object} newTask - New task object.
   * @param {function} result - Callback function to handle the query result.
   */
  static create(newTask, result) {
    db.query('INSERT INTO tasks SET ?', newTask, (err, res) => {
      if (err) result(err, null);
      result(null, res.insertId);
    });
  }

  /**
   * Update a task by its ID.
   * @param {number} id - Task ID.
   * @param {Object} updatedTask - Updated task object.
   * @param {function} result - Callback function to handle the query result.
   */
  static update(id, updatedTask, result) {
    db.query('UPDATE tasks SET ? WHERE id = ?', [updatedTask, id], (err, res) => {
      if (err) result(err, null);
      result(null, res);
    });
  }

  /**
   * Delete a task by its ID.
   * @param {number} id - Task ID.
   * @param {function} result - Callback function to handle the query result.
   */
  static delete(id, result) {
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, res) => {
      if (err) result(err, null);
      result(null, res);
    });
  }

  /**
   * Fetch tasks by user ID.
   * @param {number} user_id - User ID.
   * @param {function} result - Callback function to handle the query result.
   */
  static getTasksByUserId(user_id, result) {
    db.query('SELECT * FROM tasks WHERE user_id = ?', [user_id], (err, res) => {
      if (err) result(err, null);
      result(null, res);
    });
  }
}

module.exports = Task; // Export the Task model
