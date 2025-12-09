const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err);

  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // Mongoose/Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map(e => e.message).join(', ');
    error.statusCode = 400;
    error.message = message;
  }

  // Sequelize unique constraint error
  if (err. name === 'SequelizeUniqueConstraintError') {
    error.statusCode = 400;
    const field = err.errors[0]?.path || 'field';
    error.message = `${field} already exists`;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.statusCode = 401;
    error.message = 'Invalid token.  Please log in again';
  }

  if (err.name === 'TokenExpiredError') {
    error.statusCode = 401;
    error.message = 'Your token has expired.  Please log in again';
  }

  // Custom application errors
  if (err.message === 'Invalid credentials') {
    error.statusCode = 401;
  }

  if (err.message && err.message.includes('already exists')) {
    error.statusCode = 409;
  }

  if (err.message && err.message. includes('not found')) {
    error.statusCode = 404;
  }

  const response = {
    status: 'error',
    message: error.message || 'Server Error'
  };

  // Add stack trace only in development
  if (process. env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.error = err;
  }

  res.status(error.statusCode).json(response);
};

module.exports = errorMiddleware;