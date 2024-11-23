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
  studentAvatar
} = require("../controllers/indexController");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");


//GET request
router.get("/", isAuthenticated, nitesh);

//POST request
router.post("/me", isAuthenticated, currentUser);

//POST /student/signup
router.post("/student/signup", studentSignup);

//POST /student/signin
router.post("/student/signin", studentSignin);

//GET /student/signout
router.get("/student/signout", isAuthenticated, studentSignout);

//POST /student/send-mail
router.post("/student/send-mail", studentsendmail);

// GET /student/forget-link/student._id
router.get("/student/forget-link/:id", studentforgetlink);

// POST /student/reset-password
router.post("/student/reset-password/:id",isAuthenticated, studentresetpassword);

// POST /student/update/:student:id
router.post("/student/update/:id",isAuthenticated,studentUpdate);

// POST /student/avatar/:student:id
router.post("/student/avatar/:id",isAuthenticated,studentAvatar);

module.exports = router;
