const express = require("express");
const {
  nitesh,
  studentSignup,
  studentSignin,
  studentSignout,
  currentUser,
  studentsendmail,
  studentforgetlink,
  studentresetpassword,
  studentUpdate,
  studentAvatar,
  applyInternship,
  applyJob
} = require("../controllers/indexController");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");


//GET request
router.get("/", isAuthenticated, nitesh);

//POST request
router.post("/current", isAuthenticated, currentUser);

//POST /signup
router.post("/signup", studentSignup);

//POST /signin
router.post("/signin", studentSignin);

//GET /signout
router.get("/signout", isAuthenticated, studentSignout);

//POST /send-mail
router.post("/send-mail", studentsendmail);

// GET /forget-link/:student._id
router.get("/forget-link/:id", studentforgetlink);

// POST /reset-password/:student._id
router.post("/reset-password/:id",isAuthenticated, studentresetpassword);

// POST /update/:student._id
router.post("/update/:id",isAuthenticated,studentUpdate);

// POST /avatar/:student._id
router.post("/avatar/:id",isAuthenticated,studentAvatar);

// POST /apply/internship/:internshipid
router.post("/apply/internship/:id",isAuthenticated,applyInternship);

// POST /apply/job/:jobid
router.post("/apply/job/:id",isAuthenticated,applyJob);

module.exports = router;
