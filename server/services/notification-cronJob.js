const cron = require('node-cron');
const moment = require('moment-timezone');
const Task = require('../models/Task');
const Notification = require('../models/Notification');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const storage = require('node-sessionstorage');
const {sendEmail} = require('./email-notification')
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const {generatePDF} = require('./puppeteer')


const getServerTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const getTasksDue = (tasks, now, time, timeZone) => {
  return tasks.filter(task => {
    const taskDueDate = moment(task.dueDate).tz(timeZone);
    return taskDueDate.isBetween(now,time, undefined, '[]');
  });
};


const sendNotifications = async (taskDue, io , decoded) => {
  try {
    console.log(`Tasks due -------`, taskDue);
    
// this is the code that sends notifications to the frontend/web/client. kind of dispatching an event "tasksDue"
    io.emit('tasksDue', taskDue);

// sending email to the client
const htmlTemplate = await readFileAsync('./email.html', 'utf-8');
  const imageAttachment = await readFileAsync('./assets/task.png');

 const userId = taskDue.map(task=>task.user)
console.log('userId' , userId);
const users = await User.findById(decoded);
console.log('users',users);

  const receiver = {
    from: process.env.SENDER_EMAIL,
    to: users.email,
    subject: "task-management-app",
    html: htmlTemplate,
    attachments: [{
        filename: 'task.png',
        content: imageAttachment,
        encoding: 'base64',
        cid: 'uniqueImageCID', // Referenced in the HTML template
    }],
};
// Call the function
sendEmail(receiver)

// Here preparing payload to save in the database
    const notifications = taskDue.map(task => ({
      message: `Task due soon: ${task.title}`,
      isSent: true
    }
  ));

/* 
----saving notification in the database-----
*/

 // set isSent key to true after sending notification
    await Notification.insertMany(notifications);
    await generatePDF(); 
   
    const taskId = taskDue.map((task) => task._id);
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
    const allUsers = await User.find(); 
    for (const user of allUsers) {
      const token = storage.getItem(`token_${user._id}`);
      if (!token) {
        console.error(`Token is missing for user: ${user._id}`);
        continue;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.id) {
        console.error('Invalid token');
        continue;
      }

      const tasks = await Task.find({ isSent: false, user: decoded.id });
      console.log("Tasks for user", user._id, tasks);

     //  Filter tasks where isSent is False or they dont have isSent key.
      const tasksDue = getTasksDue(tasks, now, time, timeZone);

      if (tasksDue.length > 0) {

        await sendNotifications(tasksDue, io , decoded.id);

      } else {
        console.log('No tasks due in the next 5 minutes');
      }
    }}  catch (err) {
      console.error('Error fetching tasks due soon:', err);
    }
  
  }
  );
};

module.exports = scheduleNotificationJob;