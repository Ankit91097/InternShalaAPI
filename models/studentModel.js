const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentModel = new mongoose.Schema({
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
}, { timestamps: true });

studentModel.pre("save",function () {
    if(!this.isModified("password")){
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});
studentModel.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("Student", studentModel);