// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes'); 
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// API routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes); 

// Root route
app.get('/', (req, res) => {
  res.send('API Running...');
});

// ⬇ Import User model at the top if not already imported
const User = require('./models/User');

// ⬇ Add this debug route to inspect stored user
app.get('/api/users/debug', async (req, res) => {
  try {
    const user = await User.findOne({ email: 'nihe@example.com' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




