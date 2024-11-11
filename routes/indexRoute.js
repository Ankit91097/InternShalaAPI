const express=require('express');
const { nitesh, studentSignup,studentSignin,studentSignout, currentUser } = require('../controllers/indexController');
const router=express.Router();
const {isAuthenticated}=require('../middleware/auth')
//GET request
router.get("/",isAuthenticated,nitesh);

router.post("/me",isAuthenticated,currentUser);

//POST /student/signup
router.post("/student/signup",studentSignup);

//POST /student/signin
router.post("/student/signin",studentSignin);

//GET /student/signout
router.get("/student/signout",isAuthenticated,studentSignout);

module.exports=router;