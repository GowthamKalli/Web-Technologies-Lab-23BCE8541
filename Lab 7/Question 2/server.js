require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/books');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/books', bookRoutes);

// Serve frontend (SPA-style catch-all)
app.get('/*all', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MongoDB connection (modern, no deprecated options)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/book-finder')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 4000; // using 4000 to avoid conflict with previous project
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});