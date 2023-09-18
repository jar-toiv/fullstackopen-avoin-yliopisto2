const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendProdError(err, res);
  }
};

const sendDevError = (err, res) => {
  //¤ Wrong ID
  if (err.name === 'CastError') {
    const message = 'Invalid ID format';
    err = new AppError(message, 400);
  }
  //¤ Validation error (Schema)
  else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join('. ');
    err = new AppError(message, 400);
  }
  //¤ Duplicate key
  else if (err.code === 11000) {
    const message = 'Duplicate field value';
    err = new AppError(message, 400);
  }
  //¤ No statuscode => expect DB error
  else if (!err.statusCode) {
    err = new AppError('Database connection error', 500);
  }

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};
