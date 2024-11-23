const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
  {
    firstname:{
      type: String,
      required: [true, "Firstname is required"],
    },
    lastname:{
      type: String,
      required: [true, "Lastname is required"],
    },
    contact:{
      type: String,
      required: [true, "Contact is required"],
      maxLength:[10,"Contact must not exceed 10 character"],
      minLength:[10,"Contact should be atleast 10 character long"]
    },
    city:{
      type: String,
      required: [true, "City is required"],
    },
    gender:{
      type: String,
      enum:["Male","Female","Others"],
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
      resetPasswordToken:{
        type:String,
        default:"0"
      },
      avatar:String,
  },
  { timestamps: true }
);

studentModel.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
studentModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getjwttoken = function () {  
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Student = mongoose.model("Student", studentModel);
module.exports = Student;
