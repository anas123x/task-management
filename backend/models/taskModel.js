const db = require('../config/db');

class Task {
  constructor(task) {
    this.title = task.title;
    this.description = task.description;
  }

  static getAll(result) {
    db.query('SELECT * FROM tasks', (err, res) => {
      if (err) result(err, null);
      result(null, res);
    });
  }

  static getById(id, result) {
    db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, res) => {
      if (err) result(err, null);
      result(null, res[0]);
    });
  }

  static create(newTask, result) {
    db.query('INSERT INTO tasks SET ?', newTask, (err, res) => {
      if (err) result(err, null);
      result(null, res.insertId);
    });
  }

  static update(id, updatedTask, result) {
    db.query('UPDATE tasks SET ? WHERE id = ?', [updatedTask, id], (err, res) => {
      if (err) result(err, null);
      result(null, res);
    });
  }

  static delete(id, result) {
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, res) => {
      if (err) result(err, null);
      result(null, res);
    });
  }
}

module.exports = Task;