const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const employeeModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxLength: [10, "Contact must not exceed 10 character"],
      minLength: [10, "Contact should be atleast 10 character long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      maxLength: [15, "Password must be less than 15 characters"],
      minLength: [6, "Password must be at least 6 characters"],
      // match: [
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //     "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      // ],
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },
    organizationname: {
        type: String,
        required: [true, "organizationname is required"],
      },
    organizationlogo: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1732254721629-bf8275f694e6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    internship:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"internship"
    }],
    jobs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job"
    }]
  },
  { timestamps: true }
);

employeeModel.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
employeeModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

employeeModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Employee = mongoose.model("Employee", employeeModel);
module.exports = Employee;
