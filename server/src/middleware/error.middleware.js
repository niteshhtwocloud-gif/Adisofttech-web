// Global error handler formatting Mongoose and application exceptions into standard API responses.
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({
      success: false,
      message: `Duplicate value entered for ${field}. Please use another value.`,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: errors.join(", "),
    });
  }

  // Do not log sensitive stack traces in production
  if (process.env.NODE_ENV !== "production") {
    console.error("API Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
