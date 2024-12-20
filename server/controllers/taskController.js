const Task = require('../models/Task');

// @desc    Fetch all tasks
// @route   GET /api/tasks

const getTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// @route   POST /api/tasks


const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newTask = await Task.create({ title, description, status });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};


module.exports = { getTask, createTask };
