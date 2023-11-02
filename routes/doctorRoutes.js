const express = require("express");
const {getDoctorInfoController, updateProfileController} = require("../controllers/doctorCtrl");
const auth = require("../middlewares/auth");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", auth, getDoctorInfoController);

router.post("/updateProfile" , auth ,  updateProfileController);


module.exports = router;