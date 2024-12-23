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
     const task =await Task.findByIdAndDelete(req.params.id, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted : ", docs);
    }
});}
  catch (error) {
    res.status(500).json({ error });
  }
} ;



module.exports = { getTask, createTask , deleteTask };
