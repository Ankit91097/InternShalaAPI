const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/SendToken");
exports.nitesh = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Secure Home Page" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  res.json({ student });
});

exports.studentSignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 201, res);
});

exports.studentSignin = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!student) {
    return next(
      new ErrorHandler("Student not found with this email address", 404)
    );
  }
  const isMatch = student.comparePassword(req.body.password);
  if (!isMatch) {
    return next(new ErrorHandler("Password is incorrect", 401));
  }
  sendtoken(student, 201, res);
});

exports.studentSignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Student logged out successfully",
  });
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email });
  if (!student) {
    return next(
      new ErrorHandler("Student not found with this email address", 404)
    );
  }

  const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
    student._id
  }`;
  await sendmail(req, res, next, url);
  student.resetPasswordToken = "1";
  student.save();

  res.status(200).json({ message: "Mail sent successfully", student, url });
});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return next(
      new ErrorHandler("Student not found with this email address", 404)
    );
  }
  if(student.resetPasswordToken=="1"){
    student.resetPasswordToken="0";
    student.password=req.body.password;
    await student.save();
  }else{
    return next(
      new ErrorHandler("Invalid Reset Password Link Please Try again",500)
    )
  }
  student.password = req.body.password;
  await student.save();
  res.status(200).json({
    message: "Password has been successfully changed",
  });
});

exports.studentresetpassword=catchAsyncErrors(async(req,res)=>{
  const student=Student.findById(req.id).exec()
  student.password=req.body.password;
  await student.save();

  sendtoken(student,201,res);

})
