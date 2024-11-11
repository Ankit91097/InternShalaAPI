const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentModel");
const { sendtoken } = require("../utils/SendToken");
exports.nitesh = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Secure Home Page" });
});

exports.currentUser=catchAsyncErrors(async (req, res, next) => {
  const student=await Student.findById(req.id).exec();
  res.json({ student });
});

exports.studentSignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save(); 
  sendtoken(student,201,res);
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
  sendtoken(student,201,res);
});

exports.studentSignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Student logged out successfully",
  });
});
