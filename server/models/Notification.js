const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isSent : {
    type: Boolean,
    default: false,
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;