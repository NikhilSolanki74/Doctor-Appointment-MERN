const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const doctorModel = require('../models/doctorModel')
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
   const user = await userModel.findById({_id:req.body.userId})
   user.password=undefined;
   if(!user){
    return res.status(200).send({
      message:'user not found',
      success:false
    })
   }else{
     res.status(200).send({
      success:true,
      data:user
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

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};


const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};


const deleteAllNotificationController=async (req,res)=>{
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notifcation = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};


module.exports = { loginController, registerController , authController,applyDoctorController , getAllNotificationController ,deleteAllNotificationController};