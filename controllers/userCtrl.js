const bcrypt = require('bcryptjs')
const userModel = require('../models/User')
const jwt = require('jsonwebtoken')
const registerController = async (req,res)=>{
    try { 
      const existingUser=await userModel.findOne({email:req.body.email});
      if(existingUser){
        return res.status(200).send({message:"User Already Exist" , success:false});
      }
      const password = req.body.password
      const salt =await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password , salt);
      req.body.password = hashedPassword;
      const newUser = new userModel(req.body)
        await newUser.save();
        res.status(200).send({success:true , message:"Data Successfully Stored sir ji"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false , message:`Sir the error in Controller is ${error.message}`})
    }
}


const loginController = async (req, res)=>{
try {
     const user = await userModel.findOne({email:req.body.email});
     if(!user){
        return res.status(200).send({
          success:false,
            message:"id Banalo Pehle"
        })
    }
  
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) {
      // Use res to send an error response
      return res.status(201).send({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // Send a success response
    res.status(200).send({
      message: "Login successfully",
      success: true,
      token,
    });

} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false ,
        message:"kuch to gadbad hai userCtrl.js  me bro"
    })
}
}

const authController = async (req , res)=>{
try{
   const user = await userModel.findOne({_id:req.body.userId})
   if(!user){
    return res.status(200).send({
      message:'user not found',
      success:false
    })
   }else{
     res.status(200).send({
      success:true,
      data:{
        name:user.name,
        email:user.email
      }
     })
   }
}catch(error){
   console.log(error)
   res.status(500).send({
    message:'auth error bro',
    success:false,
    error
   })
}
}


module.exports = {loginController, registerController , authController};