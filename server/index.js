const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const connectDB = require('./Db');
const scheduleNotificationJob = require('./services/notification-cronJob');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const { Server } = require('socket.io');

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
app.use('/api/task', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Express App, please navigate to /api to access the data!');
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