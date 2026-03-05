require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const noteRoutes = require('./routes/notes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/notes', noteRoutes);

app.get('/*all', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student-notes')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
