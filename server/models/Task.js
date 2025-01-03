const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority:{
    type: String,
    required: true,
  },
    dueDate:{
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  user :{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' ,
   required : true
  },
  isSent : {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Task', TaskSchema);