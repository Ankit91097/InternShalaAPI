const express = require("express");
const {
  nitesh,
  currentEmployee,
  employeeSignup,
  employeeSignin,
  employeeSignout,
  employeesendmail,
  employeeforgetlink,
  employeeresetpassword,
  employeeUpdate,
  organizationlogo,
  createInternship,
  readInternship,
  readOneInternship,
  createjob,
  readjob,
  readOnejob,
} = require("../controllers/employeeController");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");


//GET request
router.get("/", isAuthenticated, nitesh);

//POST request
router.post("/current", isAuthenticated, currentEmployee);

//POST /signup
router.post("/signup", employeeSignup);

//POST /signin
router.post("/signin", employeeSignin);

//GET /signout
router.get("/signout", isAuthenticated, employeeSignout);

//POST /send-mail
router.post("/send-mail", employeesendmail);

// GET /forget-link/:employee._id
router.get("/forget-link/:id", employeeforgetlink);

// POST /reset-password/:employee._id
router.post("/reset-password/:id",isAuthenticated, employeeresetpassword);

// POST /update/:employee._id
router.post("/update/:id",isAuthenticated,employeeUpdate);

// POST /organizationlogo/:emloyee._id
router.post("/organizationlogo/:id",isAuthenticated,organizationlogo);

// ---------------Internship Routes---------

// POST /internship/create
router.post("/internship/create",isAuthenticated,createInternship);

// POST /internship/read
router.post("/internship/read",isAuthenticated,readInternship);

// POST /internship/read/:id
router.post("/internship/read/:id",isAuthenticated,readOneInternship);

// -------------Job Route------------------

// POST /job/create
router.post("/job/create",isAuthenticated,createjob);

// POST /job/read
router.post("/job/read",isAuthenticated,readjob);

// POST /job/read/:id
router.post("/job/read/:id",isAuthenticated,readOnejob);


module.exports = router;
