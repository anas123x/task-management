const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
  }

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

  static findByEmail(email, result) {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
      if (err) return result(err, null);
      return result(null, res[0]);
    });
  }
}

module.exports = User;