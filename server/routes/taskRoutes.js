const express = require('express');
const { getTask, createTask , deleteTask, editTask } = require('../controllers/taskController');
const {protect} = require("../middleware/authMiddleware")

const router = express.Router();

router.get('/',protect ,getTask);
router.post('/',protect ,createTask);
router.delete('/:id', protect , deleteTask );
router.put('/:id',protect , editTask );

module.exports = router;
