const cron = require('node-cron');
const moment = require('moment-timezone');
const Task = require('../models/Task');
const Notification = require('../models/Notification');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const storage = require('node-sessionstorage');


const getServerTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const getTasksDue = (tasks, now, time, timeZone) => {
  return tasks.filter(task => {
    const taskDueDate = moment(task.dueDate).tz(timeZone);
    return taskDueDate.isBetween(now,time, undefined, '[]');
  });

  
};

const sendNotifications = async (taskDue, io) => {
  try {
    console.log(`Tasks due -------`, taskDue);
    

// this is the code that sends notifications to the frontend/web/client. kind of dispatching an event "tasksDue"
    io.emit('tasksDue', taskDue);


// Here preparing payload to save in the database
    const notifications = taskDue.map(task => ({
      message: `Task due soon: ${task.title}`,
      isSent: true
    }));

/* 
----saving notification in the database-----
*/

 //TODO : 1. set isSent key to true after sending notification
    await Notification.insertMany(notifications);
   const taskId = taskDue.map((task) => task._id)
    await Task.updateMany(
      { _id: {$in: taskId} },
      { $set: { isSent: true } }
    );


  } catch (error) {
    console.error('Error sending notifications:', error);
  }
};

const scheduleNotificationJob = (io) => {
  cron.schedule('* * * * *', async () => {
    const timeZone = getServerTimeZone();
    const now = moment().tz(timeZone);
    const time = moment(now).add(5, 'minutes');

  
    
     try {

      const token  = sessionStorage.getItem('token');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId =  decoded.id 
      console.log("deecode.id" , userId)                


      const tasks = await Task.find({isSent : false}  );        //,{user : userId}
      console.log( "isSent = false" , tasks);
    
     // 2. TODO : Filter tasks where isSent is False or they dont have isSent key.
      const tasksDue = getTasksDue(tasks, now, time, timeZone);

      if (tasksDue.length > 0) {
        await sendNotifications(tasksDue, io);

      } else {
        console.log('No tasks due in the next 5 minutes');
      }
    }  catch (err) {
      console.error('Error fetching tasks due soon:', err);
    }
  
  }
  );
};

module.exports = scheduleNotificationJob;

      