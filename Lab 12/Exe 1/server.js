const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express REST API is running.');
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
