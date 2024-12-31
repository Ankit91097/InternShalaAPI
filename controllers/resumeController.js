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

exports.addInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internships.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Internship" });
});

exports.updateInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internshipIndex = student.resume.internships.findIndex(
    (i) => i.id === req.params.internshipid
  );
  student.resume.internships[internshipIndex] = {
    ...student.resume.internships[internshipIndex],
    ...req.body,
  };
  console.log(internshipIndex);
  await student.save();
  res.json({ message: "Internship Updated" });
});

exports.deleteInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredInternships = student.resume.internships.filter(
    (i) => i.id !== req.params.internshipid
  );
  student.resume.internships = filteredInternships;
  await student.save();
  res.json({ message: "Internship Deleted" });
});

exports.addResponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Responsibilities" });
});

exports.updateResponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const responsibilitiesIndex = student.resume.responsibilities.findIndex(
    (i) => i.id === req.params.responsibilitiesid
  );
  student.resume.responsibilities[responsibilitiesIndex] = {
    ...student.resume.responsibilities[responsibilitiesIndex],
    ...req.body,
  };
  console.log(responsibilitiesIndex);
  await student.save();
  res.json({ message: "Responsibilities Updated" });
});


exports.deleteResponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredResponsibilities = student.resume.responsibilities.filter(
    (i) => i.id !== req.params.responsibilitiesid
  );
  student.resume.responsibilities=filteredResponsibilities
  await student.save();
  res.json({ message: "Responsibilities Deleted" });
});

exports.addCourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Courses" });
});

exports.updateCourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const coursesIndex = student.resume.courses.findIndex(
    (i) => i.id === req.params.coursesid
  );
  student.resume.courses[coursesIndex] = {
    ...student.resume.courses[coursesIndex],
    ...req.body,
  };
  console.log(coursesIndex);
  await student.save();
  res.json({ message: "Courses Updated" });
});


exports.deleteCourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredCourses = student.resume.courses.filter(
    (i) => i.id !== req.params.coursesid
  );
  student.resume.courses=filteredCourses
  await student.save();
  res.json({ message: "Courses Deleted" });
});

exports.addProjects = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.projects.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Projects" });
});

exports.updateProjects = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projectsIndex = student.resume.projects.findIndex(
    (i) => i.id === req.params.projectsid
  );
  student.resume.projects[projectsIndex] = {
    ...student.resume.projects[projectsIndex],
    ...req.body,
  };
  console.log(projectsIndex);
  await student.save();
  res.json({ message: "Projects Updated" });
});

exports.deleteProjects = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredProjects = student.resume.projects.filter(
    (i) => i.id !== req.params.projectsid
  );
  student.resume.projects=filteredProjects
  await student.save();
  res.json({ message: "Projects Deleted" });
});

exports.addSkills = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Skills" });
});

exports.updateSkills = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skillsIndex = student.resume.skills.findIndex(
    (i) => i.id === req.params.skillsid
  );
  student.resume.skills[skillsIndex] = {
    ...student.resume.skills[skillsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Skills Updated" });
});

exports.deleteSkills = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredSkills = student.resume.skills.filter(
    (i) => i.id !== req.params.skillsid
  );
  student.resume.skills=filteredSkills
  await student.save();
  res.json({ message: "Skills Deleted" });
});

exports.addAccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.accomplishment.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Accomplishment" });
});

exports.updateAccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const accomplishmentIndex = student.resume.accomplishment.findIndex(
    (i) => i.id === req.params.accomplishmentid
  );
  student.resume.accomplishment[accomplishmentIndex] = {
    ...student.resume.accomplishment[accomplishmentIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Accomplishment Updated" });
});

exports.deleteAccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredAccomplishment = student.resume.accomplishment.filter(
    (i) => i.id !== req.params.accomplishmentid
  );
  student.resume.accomplishment=filteredAccomplishment
  await student.save();
  res.json({ message: "Accomplishment Deleted" });
});
