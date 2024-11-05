/**
 * Global Error Handler Middleware
 * Processes all errors and sends appropriate responses
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString()
  });

  // Handle specific error types
  if (err.message.includes('UNIQUE constraint failed')) {
    return res.status(400).json({
      success: false,
      error: 'Email address already exists'
    });
  }

  if (err.message.includes('required')) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};

module.exports = errorHandler;