const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  res.json({ message: "resume aaana", resume });
});

exports.addEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Education" });
});

exports.updateEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.education.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };
  console.log(eduIndex);
  await student.save();
  res.json({ message: "Education Updated" });
});


exports.deleteEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredEudcation = student.resume.education.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.education=filteredEudcation
  await student.save();
  res.json({ message: "Education Deleted" });
});

exports.addJobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Job details added" });
});

exports.updateJobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobIndex = student.resume.jobs.findIndex(
    (i) => i.id === req.params.jobid
  );
  student.resume.jobs[jobIndex] = {
    ...student.resume.jobs[jobIndex],
    ...req.body,
  };
  console.log(jobIndex);
  await student.save();
  res.json({ message: "Job Updated" });
});

exports.deleteJobs = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredJobs = student.resume.jobs.filter(
    (i) => i.id !== req.params.jobid
  );
  student.resume.jobs=filteredJobs
  await student.save();
  res.json({ message: "Job Deleted" });
});