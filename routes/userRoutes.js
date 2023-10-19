const express = require('express');
const { loginController, registerController, authController,applyDoctorController} = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/login' , loginController)
router.post('/register' , registerController);


router.post('/getUserData' , auth ,authController)
module.exports = router


router.post('/apply-doctor' , auth ,applyDoctorController)
module.exports = router