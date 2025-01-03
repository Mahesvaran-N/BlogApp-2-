const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/mern-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Registration Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const userDoc = await User.create({ username, password });
    res.status(200).json(userDoc);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'Error creating user' });
  }
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
