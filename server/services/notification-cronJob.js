const cron = require('node-cron'); 
const Task = require('../models/Task'); 

const scheduleNotificationJob = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 1000);
  
    try {
      const tasksDueSoon = await Task.find({
        dueDate: { $gte: now, $lt: oneHourLater },
      });
  
      if (tasksDueSoon.length > 0) {
        console.log(`Tasks due within the next hour:`, tasksDueSoon);
        io.emit('tasksDueSoon', tasksDueSoon);
      }
    } catch (err) {
      console.error('Error fetching tasks due soon:', err);
    }
  });
};

module.exports = scheduleNotificationJob;