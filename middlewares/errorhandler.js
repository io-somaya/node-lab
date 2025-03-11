const APIError = require("../util/APIError");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // ValidationError
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ status: "failure", message: "Validation Error", errors });
  }

  // DuplicateKeyError
  if (err.code === 11000) {
    return res.status(400).json({ status: "failure", message: "Duplicate key error", error: "This email is already in use." });
  }

  // CastError
  if (err.name === "CastError") {
    return res.status(400).json({ status: "failure", message: "Invalid ID format" });
  }

  //4- jwt error
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ status: "failure", message: "Unauthorized" });
  }

  // APIError
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ status: "failure", message: err.message });
  }

  // Default error handler
  res.status(500).json({ status: "failure", message: "Internal Server Error" });
};

module.exports = errorHandler;