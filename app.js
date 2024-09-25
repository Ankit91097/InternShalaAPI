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


app.use("/", require("./routes/indexRoute"));

app.all("*",(req,res,next)=>{
  next(new ErrorHandler(`Page not found ${req.url}`,404))
})

app.use(generatedErrors)

app.listen(
  process.env.PORT,
  console.log(`server running on port ${process.env.PORT}`)
);
