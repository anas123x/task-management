const Task = require("../models/taskModel");
const jwt = require('jsonwebtoken');
const secretKey = 'your_jwt_secret';
exports.getAllTasks = (req, res) => {
  Task.getAll((err, tasks) => {
    if (err) res.status(500).send(err);
    res.status(200).json(tasks);
  });
};

exports.getTaskById = (req, res) => {
  Task.getById(req.params.id, (err, task) => {
    if (err) res.status(500).send(err);
    res.status(200).json(task);
  });
};

exports.createTask = (req, res) => {
  const newTask = new Task(req.body);
  Task.create({ ...newTask, user_id: getCurrentUserId(req) }, (err, taskId) => {
    if (err) res.status(500).send(err);
    res.status(201).json({ id: taskId, ...newTask , user_id: getCurrentUserId(req)});
  });
};

exports.updateTask = (req, res) => {
  const updatedTask = new Task(req.body.task);
  Task.update(req.params.id, updatedTask, (err) => {
    if (err) res.status(500).send(err);
    res.status(200).send("Task updated successfully");
  });
};

exports.deleteTask = (req, res) => {
  Task.delete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(200).send("Task deleted successfully");
  });

};

exports.getTasksByUserId = (req, res) => {
  console.log("ee")
  console.log("iddddddd",getCurrentUserId(req));
  Task.getTasksByUserId(getCurrentUserId(req), (err, tasks) => {
    if (err) res.status(500).send(err);
    res.status(200).json(tasks);
  });
};
const  getCurrentUserId = (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, secretKey);
  return decoded.id;
};
