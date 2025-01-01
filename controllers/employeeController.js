const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Employee = require("../models/employeeModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/SendToken");
const path = require("path");
const { InitImageKit } = require("../utils/imagekit");
const Internship = require("../models/internshipModel");
const imagekit = InitImageKit();

exports.nitesh = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Secure Employee Home Page" });
});

exports.currentEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();
  res.json({ employee });
});

exports.employeeSignup = catchAsyncErrors(async (req, res, next) => {
  const employee = await new Employee(req.body).save();
  sendtoken(employee, 201, res);
});

exports.employeeSignin = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!employee) {
    return next(
      new ErrorHandler("Employee not found with this email address", 404)
    );
  }
  const isMatch = employee.comparePassword(req.body.password);
  if (!isMatch) {
    return next(new ErrorHandler("Password is incorrect", 401));
  }
  sendtoken(employee, 201, res);
});

exports.employeeSignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Employee logged out successfully",
  });
});

exports.employeesendmail = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email });
  if (!employee) {
    return next(
      new ErrorHandler("Employee not found with this email address", 404)
    );
  }

  const url = `${req.protocol}://${req.get("host")}/employee/forget-link/${
    employee._id
  }`;
  await sendmail(req, res, next, url);
  employee.resetPasswordToken = "1";
  employee.save();

  res.status(200).json({ message: "Mail sent successfully", employee, url });
});

exports.employeeforgetlink = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return next(
      new ErrorHandler("Employee not found with this email address", 404)
    );
  }
  if (employee.resetPasswordToken == "1") {
    employee.resetPasswordToken = "0";
    employee.password = req.body.password;
    await employee.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link Please Try again", 500)
    );
  }
  employee.password = req.body.password;
  await employee.save();
  res.status(200).json({
    message: "Password has been successfully changed",
  });
});

exports.employeeresetpassword = catchAsyncErrors(async (req, res) => {
  const emoployee = await Employee.findById(req.id).exec();
  emoployee.password = req.body.password;
  await emoployee.save();

  sendtoken(emoployee, 201, res);
});

exports.employeeUpdate = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body
  ).exec();
  res.status(200).json({
    success: true,
    message: "Employee Updated Successfully",
    employee,
  });
});

exports.organizationlogo = catchAsyncErrors(async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).exec();
    if (!employee) {
      return next(new ErrorHandler("Employee not found", 404));
    }

    const file = req.files.organizationlogo;
    const modifiedFileName = `organizationlogo-${Date.now()}${path.extname(
      file.name
    )}`;

    if (employee.organizationlogo && employee.organizationlogo.fileId) {
      try {
        await imagekit.deleteFile(employee.organizationlogo.fileId);
      } catch (error) {
        console.log("Error deleting old image:", error);
      }
    }

    const { fileId, url } = await imagekit.upload({
      file: file.data,
      fileName: modifiedFileName,
    });

    employee.organizationlogo = { fileId, url };
    await employee.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      organizationlogo: { fileId, url }
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});


//----------------Create Internship--------------

exports.createInternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await new Internship(req.body).save();
  res.status(201).json({
    success:true,
    message:"Internship Created Successfully",
    internship
  })
});