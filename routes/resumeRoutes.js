const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const { resume, addEducation, updateEducation, deleteEducation, addJobs, updateJobs, deleteJobs } = require("../controllers/resumeController");

//GET /
router.get('/',isAuthenticated,resume);

//POST /addedu
router.post('/addedu',isAuthenticated,addEducation);

//POST /edit-edu/:eduid          uuid
router.post('/edit-edu/:eduid',isAuthenticated,updateEducation);

//POST /delete-edu/:eduid          uuid
router.post('/delete-edu/:eduid',isAuthenticated,deleteEducation);

//POST /addjob
router.post('/addjob',isAuthenticated,addJobs);

//POST /edit-job/:jobid          uuid
router.post('/edit-job/:jobid',isAuthenticated,updateJobs);

//POST /delete-job/:jobid          uuid
router.post('/delete-job/:jobid',isAuthenticated,deleteJobs);

module.exports = router;