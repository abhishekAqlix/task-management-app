const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

const protect = async (req, res, next) => {
  try {
    // token from headers
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Please login to get access." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // user still exists or not
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: "The user belong to this token no longer exists." });
    }

    // Attach the user to the request object
    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token or unauthorized access." });
  }
};

module.exports = {protect};
