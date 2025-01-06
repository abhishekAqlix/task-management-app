const express = require('express');

const { getTask, createTask , deleteTask, editTask, logOut  } = require('../controllers/taskController');
const {protect} = require("../middleware/authMiddleware")

const router = express.Router();

module.exports = (io) => {
    router.get('/',protect ,getTask);
    router.post('/',protect ,createTask);
    router.post('/logout', protect ,logOut);
    router.put('/:id', protect,(req, res) => editTask(req, res, io));
    router.delete('/:id',protect , (req, res) =>deleteTask(req, res, io));
    return router;
  };


// router.delete('/:id', protect , deleteTask );
// router.put('/:id',protect , editTask );


//module.exports = router;
