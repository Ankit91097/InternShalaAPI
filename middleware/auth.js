const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const { json } = require("stream/consumers");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login into access the resource", 401));
  }

  const { id } = jwt.verify(token, process.env.Jwt_SECRET);
  req.id=id;
  next();
});
