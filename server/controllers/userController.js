const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cookieParser());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register
const register = async (req, res) => {
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
    console.error("Register Error:", err);
    return res.status(500).json({ error: "An error occurred during registration." });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = signToken(user._id);

    return res.status(200).json({
      status: "success",
      token,
      message: "Successfully logged in.",
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: " error occurred during login." });
  }
};

// Google Sign-In
const googleSignIn = async (req, res) => {
  const { credential } = req.body;
  
  try {
    console.log("credential", credential);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, password: "google-auth-rnadom-password" });
    }

    const token = signToken(user._id);
    return res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    console.error("Google Sig-In Error:", err);
    return res.status(500).json({ error: "An error occurred." });
  }
};

module.exports = { register, login, googleSignIn };
