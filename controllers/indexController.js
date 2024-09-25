const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentModel");
exports.nitesh = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "hello from me" });
});

exports.studentSignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save(); 
  res.status(201).json({
    success: true,
    message: "Student created successfully",
    student,
  });
});

exports.studentSignin = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).select("+password").exec();

  if(!student){
    return next(new ErrorHandler("Student not found with this email address", 404));
  }
  const isMatch = student.comparePassword(req.body.password);
  if(!isMatch){
    return next(new ErrorHandler("Password is incorrect", 401));
  }
  res.json(student);
});

exports.studentSignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Student logged out successfully",
  });
});
