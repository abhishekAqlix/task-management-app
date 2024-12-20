const express = require('express');
const { getTask, createTask } = require('../controllers/taskController');

const router = express.Router();

router.get('/', getTask);
router.post('/', createTask);

module.exports = router;
