require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();



// database connection
require("./models/database").connectDatabase();

//logger
const logger = require("morgan");
const ErrorHandler = require("./utils/ErrorHandler");
const { generateKey } = require("crypto");
const { generatedErrors } = require("./middleware/error");


app.use(logger("tiny")); //terminal p route chhoti information deta h


//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session and cookie
const session=require('express-session');
const cookieparser = require('cookie-parser');
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:process.env.EXPRESS_SESSION_SECRET
}));
app.use(cookieparser());

//express file-upload used for uploading file or image
const fileupload=require('express-fileupload');
app.use(fileupload());

//routes
app.use("/student", require("./routes/indexRoute"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employee", require("./routes/employeeRoute"));

app.all("*",(req,res,next)=>{
  next(new ErrorHandler(`Page not found ${req.url}`,404))
})

app.use(generatedErrors)

app.listen(
  process.env.PORT,
  console.log(`server running on port ${process.env.PORT}`)
);
