const express=require('express');
const { nitesh, studentSignup,studentSignin,studentSignout } = require('../controllers/indexController');
const router=express.Router();
//GET request
router.get("/",nitesh)

//POST /student/signup
router.post("/student/signup",studentSignup);

//POST /student/signin
router.post("/student/signin",studentSignin);

//GET /student/signout
router.get("/student/signout",studentSignout);

module.exports=router;