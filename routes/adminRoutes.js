const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
} = require("../controllers/adminCtrl");
const auth = require("../middlewares/auth");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", auth, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", auth, getAllDoctorsController);

module.exports = router;