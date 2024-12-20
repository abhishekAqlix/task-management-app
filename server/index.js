const express = require('express');
const connectDB = require('./Db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 3000;

// Middlewares //
app.use(express.json());

connectDB();



app.use('/api/task', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Express App, please navigate to /api to access the data!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
