const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const connectDB = require('./Db');
const scheduleNotificationJob = require('./services/notification-cronJob');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const { Server } = require('socket.io');
const nodemailer = require("nodemailer");

const app = express();
const port = 4000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
}); 

// Middlewares //
app.use(express.json());
app.use(cors());
connectDB();

app.use('/user', userRoutes);
app.use('/api/task', taskRoutes(io));

app.get('/',(req, res) => {
  res.send('Welcome to the Express App, please navigate to /api to access the data!');
});

const transporter = nodemailer.createTransport({
  service : "gmail",
  secure :true,
  port:465 ,
  auth : {
      user : "diptri6657@gmail.com"        ,
     pass :    "wwoz gafa lugf feoi"    //"lwoj yivb hejr vhk"
  }
});

app.get('/send-email-test',async(req , res)=>{
const receiver ={
  from : "diptri6657@gmail.com" , 
   to: "deepika.tripathi@aqlix.com",
  subject: "task-management",
  text: "Hello world?", 
  html: "<b>Task Done?</b>"
} 
  try {
    const emailRes = await transporter.sendMail(receiver);
    console.log('Email sent:', emailRes);
    res.send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

scheduleNotificationJob(io);


server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});