const express = require("express");
const {getDoctorInfoController, updateProfileController,getDoctorByIdController} = require("../controllers/doctorCtrl");
const auth = require("../middlewares/auth");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", auth, getDoctorInfoController);

router.post("/updateProfile" , auth ,  updateProfileController);

router.post("/getDoctorById" , auth , getDoctorByIdController);


module.exports = router;