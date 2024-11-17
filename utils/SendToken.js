exports.sendtoken = (student, statusCode, res) => {
  const token = student.getjwttoken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure:true       //agar https p chalana h to
  };
  res.status(statusCode).cookie("token", token,options).json({
    success: true,
    id: student._id,
    token,
  });
};
