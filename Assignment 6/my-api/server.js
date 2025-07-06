const express = require('express');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  console.log(`Health check: http://localhost:${config.PORT}/health`);
  console.log(`API Base URL: http://localhost:${config.PORT}/api/users`);
});

module.exports = app;