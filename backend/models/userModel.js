const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
  }

  static create(newUser, result) {
    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) result(err, null);
      newUser.password = hash;
      db.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) result(err, null);
        result(null, res.insertId);
      });
    });
  }

  static findByEmail(email, result) {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
      if (err) result(err, null);
      result(null, res[0]);
    });
  }
}

module.exports = User;