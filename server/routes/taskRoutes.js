const express = require('express');
const { getTask, createTask , deleteTask } = require('../controllers/taskController');
const {protect} = require("../middleware/authMiddleware")

const router = express.Router();

router.get('/',protect ,getTask);
router.post('/',protect ,createTask);
router.delete('/:id',protect , deleteTask  )
module.exports = router;
