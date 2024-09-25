const express=require('express');
const { nitesh } = require('../controllers/indexController');
const router=express.Router();

router.get("/",nitesh)

module.exports=router;