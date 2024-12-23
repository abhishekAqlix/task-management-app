const express = require('express');
const cors = require('cors'); 
const connectDB = require('./Db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 4000;

// Middlewares //
app.use(express.json());
app.use(cors()); 

connectDB();


app.use('/user' , userRoutes);
app.use('/api/task', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Express App, please navigate to /api to access the data!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
