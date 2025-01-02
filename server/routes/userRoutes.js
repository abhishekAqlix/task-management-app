const express = require('express');
const { register,login , googleSignIn } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google-signin', googleSignIn);

  
module.exports = router;
