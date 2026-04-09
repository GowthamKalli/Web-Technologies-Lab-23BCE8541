const express = require('express');

const app = express();
const PORT = 3002;

// Global middleware layer 1: request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[Global 1] ${req.method} ${req.url} at ${timestamp}`);
  req.requestTimestamp = timestamp;
  next();
});

// Global middleware layer 2: preprocessing request data
app.use((req, res, next) => {
  console.log('[Global 2] Preprocessing request');
  req.preprocessed = true;
  next();
});

// Route-level middleware layer 1
const checkApiKey = (req, res, next) => {
  console.log('[Route Level 1] Checking API key');

  const apiKey = req.query.apiKey;
  if (apiKey !== '12345') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid API key',
    });
  }

  req.apiKeyValidated = true;
  next();
};

// Route-level middleware layer 2
const attachRouteInfo = (req, res, next) => {
  console.log('[Route Level 2] Attaching route-specific info');
  req.routeInfo = 'Protected route middleware executed';
  next();
};

app.get('/', (req, res) => {
  console.log('[Handler] Sending public route response');
  res.send('Middleware demo server is running.');
});

app.get('/status', (req, res) => {
  console.log('[Handler] Sending status response');
  res.json({
    success: true,
    message: 'Global middleware executed successfully',
    method: req.method,
    url: req.url,
    timestamp: req.requestTimestamp,
    preprocessed: req.preprocessed,
  });
});

app.get('/protected', checkApiKey, attachRouteInfo, (req, res) => {
  console.log('[Handler] Sending protected route response');
  res.json({
    success: true,
    message: 'Access granted to protected route',
    method: req.method,
    url: req.url,
    timestamp: req.requestTimestamp,
    preprocessed: req.preprocessed,
    apiKeyValidated: req.apiKeyValidated,
    routeInfo: req.routeInfo,
  });
});

app.listen(PORT, () => {
  console.log(`Middleware demo server running on http://localhost:${PORT}`);
});
