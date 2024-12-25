const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config(); 


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//Register
const register = async (req, res, next) => {
  try {
    const users = req.body;
    const savedUser = await User.create(users);
    const token = signToken(savedUser._id);
    return res.status(201).json({
      status: "success",
      token,
      data: {
        user: savedUser,
      },
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ error: "An error occurred during Register." });
  }
};

//login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "email and password required." });
    }
    const users = await User.findOne({ email }).select("+password");
    if (!users || !(await users.correctPassword(password, users.password))) {
      return res.status(500).send({ message: "Invalid credentials" });
    }

    const token = signToken(users._id);

    return res.status(200).json({
      status: "success",
      token,
      message : "successfully login"
    });
  } catch(err) {
    console.log("err",err)
    return res.status(500).send({ error: "An error occurred during login." });
  }
};

module.exports = { register , login };

