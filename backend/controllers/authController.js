const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
  const newUser = new User(req.body);
  User.create(newUser, (err, userId) => {
    if (err) {
      if (err === 'User already exists') {
        return res.status(400).send(err);
      }
      return res.status(500).send(err);
    }
    return res.status(201).json({ id: userId });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, user) => {
    if (err) res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) res.status(500).send(err);
      if (!isMatch) return res.status(401).send('Invalid credentials');

      const token = jwt.sign({ id:user.id }, 'your_jwt_secret', { expiresIn: '24h' });
      res.status(200).json({ token });
    });
  });
};