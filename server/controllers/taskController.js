const { Error } = require('mongoose');
const Task = require('../models/Task');

// @desc    Fetch all tasks
// @route   GET /api/tasks

const getTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log("tasks", tasks)
    res.status(200).json(tasks);
  }
  catch (error) {
    console.log("console", error)
    res.status(500).json({ error });
  }
};

// @route   POST /api/tasks
// 

const createTask = async (req, res) => {
  const { title, description, priority, dueDate, status } = req.body;
  console.log("deDate--", dueDate)
  try {
    const newTask = await Task.create({ title, description, priority, dueDate, status });
    res.status(201).json(newTask);
  }
  catch (error) {
    console.log("console", error)
    res.status(500).json({ error });
  }
};
// delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res.status(500).send({ msg: "Task not exists!" });
    }
    console.log("task", task)

    const response = await Task.deleteOne({ _id: req.params.id });
    //await res.save();
    return res.status(201);
  }
  catch (error) {
    console.log("error", Error)
    res.status(500).json({ error });
  }
};

//edit or update task
const editTask = async (req, res) => {

  const { title, description, priority, dueDate, status } = req.body;
  try {
    io.emit('notificationUpdated', taskDue);
    const result = await Task.findByIdAndUpdate({ _id: req.params.id }, { title, description, priority, dueDate, status }, { new: true });
    res.status(200).json(result);

  }
  catch (error) {
    console.log("console", error)
    res.status(500).json({ error });
  }
};



module.exports = { getTask, createTask, deleteTask, editTask };
