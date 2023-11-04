const express = require("express");
const {getDoctorInfoController, updateProfileController,getDoctorByIdController, doctorAppointmentsController} = require("../controllers/doctorCtrl");
const auth = require("../middlewares/auth");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", auth, getDoctorInfoController);

router.post("/updateProfile" , auth ,  updateProfileController);

router.post("/getDoctorById" , auth , getDoctorByIdController);

router.get('/doctor-appointments',  auth ,doctorAppointmentsController )


module.exports = router;