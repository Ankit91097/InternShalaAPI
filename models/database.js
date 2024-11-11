const mongoose = require("mongoose");

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("mongodb connected with server");
    } catch (error) {
        console.log(error.message);
    }
};
//database connect karne ke liye hame app.js me connectDatabase function ko call karne padta hai