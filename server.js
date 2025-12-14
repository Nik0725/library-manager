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
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://library-database-manager.netlify.app'
  ],
  credentials: true
}));
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


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




