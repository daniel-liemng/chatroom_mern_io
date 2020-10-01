// Catch Error Handler

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      // Validation errors
      if (typeof err === "string") {
        res.status(400).json({ message: err });
      } else {
        next(err);
      }
    });
  };
};

// MongoDB Validation Error Handler
// Detect if there are mongodb validation errors

exports.mongooseErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);

  const errorKeys = Object.keys(err.errors);
  let message = "";
  errorKeys.forEach((key) => (message += err.errors[key].message + ", "));

  message = message.substr(0, message.length - 2);

  res.status(400).json({
    message,
  });
};

// Development Error Handler
// In development , show good error messages so if we hit syntax error, ...
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };

  res.status(err.status || 500).json(errorDetails);
};

// Production Error Handler
// No stackraces and error details are leaked to user
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: "Internal Server Error",
  });
};

// 404 Page Error
exports.notFound = (req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
};
