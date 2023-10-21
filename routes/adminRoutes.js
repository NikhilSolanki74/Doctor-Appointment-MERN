const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");
const auth = require("../middlewares/auth");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", auth, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", auth, getAllDoctorsController);


router.post('/changeAccountStatus',auth, changeAccountStatusController);

module.exports = router;