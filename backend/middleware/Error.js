const ErrorHandler = require("../utils/errorHandlers");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.Message = error.Message || "Internal Server Error";

  // Wrong mongoDb
  if (error.name === "CastError") {
    const message = `Resource not found ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key errror
  if (error.code === 11000) {
    const message = `User with this ${Object.keys(
      error.keyValue
    )} already Exists`;
    error = new ErrorHandler(message, 400);
  }

  //JSon web token
  if (error.code === "JsonwebTokenError") {
    const message = `Web Token is Invalid`;
    error = new ErrorHandler(message, 400);
  }
  //JSon web token expire
  if (error.code === "TokenExpiredError") {
    const message = `Web Token is Invalid`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message,
  });
};
