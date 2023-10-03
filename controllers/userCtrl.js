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
     const emailUser = await userModel.findOne({email:req.body.email});
     if(!emailUser){
        return res.status(200).send({
          success:false,
            message:"id bnake aao yha per login kerne"
        })
    }
   
    // const pass =await bcrypt.compare(req.body.password , emailUser.password);
    // console.log(pass,'lekin ek second');
    // if(!pass){
       
    //     return res.status(500).send({
    //         message:"the email or password is wrong ",
    //         success:false
    //     })
    // }
    // const token = jwt.sign({ id:emailUser.__id},process.env.JWT_SECRET , {expiresIn: '1d'} )
    // res.status(200).send({message:'Login Suceessfully' , success:true ,token})
    

   
    const pass = await bcrypt.compare(req.body.password, emailUser.password);
    if (!pass) {
      // Use res to send an error response
      return res.status(400).send({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const token = jwt.sign({ id: emailUser.__id }, process.env.JWT_SECRET, {
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


module.exports = {loginController, registerController};