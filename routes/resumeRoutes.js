const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const {
  resume,
  addEducation,
  updateEducation,
  deleteEducation,
  addJobs,
  updateJobs,
  deleteJobs,
  addInternship,
  updateInternship,
  deleteInternship,
  addResponsibilities,
  updateResponsibilities,
  deleteResponsibilities,
  addCourses,
  updateCourses,
  deleteCourses,
  addProjects,
  updateProjects,
  deleteProjects,
  addSkills,
  updateSkills,
  deleteSkills,
  addAccomplishment,
  updateAccomplishment,
  deleteAccomplishment,
} = require("../controllers/resumeController");

//GET /
router.get("/", isAuthenticated, resume);

//POST /addedu
router.post("/addedu", isAuthenticated, addEducation);

//POST /edit-edu/:eduid          uuid
router.post("/edit-edu/:eduid", isAuthenticated, updateEducation);

//POST /delete-edu/:eduid          uuid
router.post("/delete-edu/:eduid", isAuthenticated, deleteEducation);

//POST /addjob
router.post("/addjob", isAuthenticated, addJobs);

//POST /edit-job/:jobid          uuid
router.post("/edit-job/:jobid", isAuthenticated, updateJobs);

//POST /delete-job/:jobid          uuid
router.post("/delete-job/:jobid", isAuthenticated, deleteJobs);

//POST /addinternship
router.post("/addinternship", isAuthenticated, addInternship);

//POST /edit-internship/:internshipid          uuid
router.post(
  "/edit-internship/:internshipid",
  isAuthenticated,
  updateInternship
);

//POST /delete-internship/:internshipid          uuid
router.post(
  "/delete-internship/:internshipid",
  isAuthenticated,
  deleteInternship
);

//POST /addresponsibilities
router.post("/addresponsibilities", isAuthenticated, addResponsibilities);

//POST /edit-responsibilities/:responsibilitiesid          uuid
router.post(
  "/edit-responsibilities/:responsibilitiesid",
  isAuthenticated,
  updateResponsibilities
);

//POST /delete-responsibilities/:responsibilitiesid          uuid
router.post(
  "/delete-responsibilities/:responsibilitiesid",
  isAuthenticated,
  deleteResponsibilities
);

//POST /addcourses
router.post("/addcourses", isAuthenticated, addCourses);

//POST /edit-courses/:coursesid          uuid
router.post("/edit-courses/:coursesid", isAuthenticated, updateCourses);

//POST /delete-courses/:coursesid          uuid
router.post("/delete-courses/:coursesid", isAuthenticated, deleteCourses);

//POST /addprojects
router.post("/addprojects", isAuthenticated, addProjects);

//POST /edit-projects/:projectsid          uuid
router.post("/edit-projects/:projectsid", isAuthenticated, updateProjects);

//POST /delete-projects/:projectsid          uuid
router.post("/delete-projects/:projectsid", isAuthenticated, deleteProjects);

//POST /addskills
router.post("/addskills", isAuthenticated, addSkills);

//POST /edit-skills/:skillsid          uuid
router.post("/edit-skills/:skillsid", isAuthenticated, updateSkills);

//POST /delete-skills/:skillsid          uuid
router.post("/delete-skills/:skillsid", isAuthenticated, deleteSkills);

//POST /addaccomplishment
router.post("/addaccomplishment", isAuthenticated, addAccomplishment);

//POST /edit-accomplishment/:accomplishmentid          uuid
router.post("/edit-accomplishment/:accomplishmentid", isAuthenticated, updateAccomplishment);

//POST /delete-accomplishment/:accomplishmentid          uuid
router.post("/delete-accomplishment/:accomplishmentid", isAuthenticated, deleteAccomplishment);

module.exports = router;
