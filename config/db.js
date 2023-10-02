const mongoose = require('mongoose');
 const colors = require("colors");
// require('dotenv').config();
 const connectDB = async ()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URL);
        // const host = await mongoose.connection.host
        console.log(`the host server is  ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`this is the error bro ${error}`.bgRed.white)
    }
 }

 module.exports = connectDB;