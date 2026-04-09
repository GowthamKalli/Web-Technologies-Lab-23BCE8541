const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3003;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lab12_exe3';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('MongoDB CRUD API is running.');
});

app.use('/api/products', productRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected.');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination.');
  process.exit(0);
});

startServer();
