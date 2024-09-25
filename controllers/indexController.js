const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");

exports.nitesh = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "hello from me" });
});
