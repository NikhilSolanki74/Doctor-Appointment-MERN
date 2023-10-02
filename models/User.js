const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true ,'Name is requored']
    },
    email:{
        type:String,
        required:[true ,'Email is requored']
    },
    password:{
        type:String,
        required:[true ,'Password is requored']
    }
})