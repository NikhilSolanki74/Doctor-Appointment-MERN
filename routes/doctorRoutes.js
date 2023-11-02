const express = require("express");
const {getDoctorInfoController} = require("../controllers/doctorCtrl");
const auth = require("../middlewares/auth");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", auth, getDoctorInfoController);



module.exports = router;