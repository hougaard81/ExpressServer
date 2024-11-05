/**
 * Main application entry point
 * Sets up Express server with middleware and routes
 */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet'); // Add security headers
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Request parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('dev'));

// Development-only middleware
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log('Request:', {
      url: req.url,
      method: req.method,
      body: req.body,
      timestamp: new Date().toISOString()
    });
    next();
  });
}

// Routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
    🚀 Server running on http://localhost:${PORT}
    📚 API Documentation available at http://localhost:${PORT}/api-docs
    ⚙️  Environment: ${process.env.NODE_ENV || 'development'}
  `);
});

module.exports = app; // Export for testing