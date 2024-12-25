const { Error } = require('mongoose');
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
  const { title, description,priority, status } = req.body;

  try {
    const newTask = await Task.create({ title, description,priority, status });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};
// delete Task
const deleteTask = async(req,res) => {
  try{ 
    console.log(req.params)
    const task = await Task.findOne({_id : req.params.id});
    console.log("task",task)
    if(task){
      await Task.deleteOne({_id : req.params.id})
    }
    return res.status(200).send({msg : "deleted!"})
}
  catch (error) {
    console.log("error",Error)
    res.status(500).json({ error });
  }
} ;



module.exports = { getTask, createTask , deleteTask };
