/**
 * @file User.js
 * @description User model that interacts with the MySQL database to handle user-related operations.
 * This includes creating a user, hashing passwords, and retrieving users by email.
 */

const db = require('../config/db'); // Database connection
const bcrypt = require('bcryptjs'); // Bcrypt library for hashing passwords

class User {
  /**
   * User constructor
   * @param {Object} user - User object containing email and password.
   */
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
  }

  /**
   * Create a new user in the database.
   * Checks if the email already exists, hashes the password, and inserts the user into the database.
   * @param {Object} newUser - New user object.
   * @param {function} result - Callback function to handle the query result.
   */
  static create(newUser, result) {
    db.query('SELECT * FROM users WHERE email = ?', [newUser.email], (err, res) => {
      if (err) return result(err, null);
      if (res.length) return result('User already exists', null);

      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) return result(err, null);
        newUser.password = hash;
        db.query('INSERT INTO users SET ?', newUser, (err, res) => {
          if (err) return result(err, null);
          return result(null, res.insertId);
        });
      });
    });
  }

  /**
   * Find a user by their email.
   * @param {string} email - User email.
   * @param {function} result - Callback function to handle the query result.
   */
  static findByEmail(email, result) {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
      if (err) return result(err, null);
      return result(null, res[0]);
    });
  }
}

module.exports = User; // Export the User model
