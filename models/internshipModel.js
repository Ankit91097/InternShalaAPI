const mongoose = require("mongoose");

const internshipModel = mongoose.Schema(
  {
    profile: String,
    skill: String,
    internshiptype: {
      type: String,
      enum: ["In Office", "Remote"],
    },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["Fixed", "Negotiable", "Performance based", "Unpaid"],
      },
      amount:Number,
    },
    perks:String,
    assessments:String
  },
  { timeStamp: true }
);
const Internship = mongoose.model("internship", internshipModel);
module.exports = Internship;
