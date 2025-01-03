const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/SendToken");
const path = require("path");
const { InitImageKit } = require("../utils/imagekit");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const imagekit = InitImageKit();

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
  if (student.resetPasswordToken == "1") {
    student.resetPasswordToken = "0";
    student.password = req.body.password;
    await student.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link Please Try again", 500)
    );
  }
  student.password = req.body.password;
  await student.save();
  res.status(200).json({
    message: "Password has been successfully changed",
  });
});

exports.studentresetpassword = catchAsyncErrors(async (req, res) => {
  const student = await Student.findById(req.id).exec();
  student.password = req.body.password;
  await student.save();

  sendtoken(student, 201, res);
});

exports.studentUpdate = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body
  ).exec();
  res.status(200).json({
    success: true,
    message: "Student Updated Successfully",
    student,
  });
});

exports.studentAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).exec();
    if (!student) {
      return next(new ErrorHandler("Student not found", 404));
    }

    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
      file.name
    )}`;

    if (student.avatar && student.avatar.fileId) {
      try {
        await imagekit.deleteFile(student.avatar.fileId);
      } catch (error) {
        console.log("Error deleting old image:", error);
      }
    }

    const { fileId, url } = await imagekit.upload({
      file: file.data,
      fileName: modifiedFileName,
    });

    student.avatar = { fileId, url };
    await student.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      avatar: { fileId, url }
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


// ----------------Apply Internship-----------
exports.applyInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.id).exec();
  console.log(student,internship)
  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save();
  await internship.save()
  res.json({ student,internship });
});

// ----------------Apply Job-----------
exports.applyJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.id).exec();
  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save();
  await job.save()
  res.json({ student,job });
});