const handleError = (httpStatus, errMessage, next) => {
  const err = new Error(errMessage);
  err.statusCode = httpStatus;
  err.isOperational = true;
  next(err);
};
module.exports = handleError;
