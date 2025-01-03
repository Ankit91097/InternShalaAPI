const mongoose = require("mongoose");

const jobModel = mongoose.Schema(
  {
    student:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    }],
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    title: String,
    skill: String,
    jobtype: {
      type: String,
      enum: ["In Office", "Remote"],
    },
    openings: Number,
    description: String,
    preferences: String,
    salary: Number,
    perks: String,
    assessments: String,
  },
  { timeStamp: true }
);
const Job = mongoose.model("job", jobModel);
module.exports = Job;
