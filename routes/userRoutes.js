const express = require('express');
const { loginController, registerController, authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController, getAllDoctorsController } = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/login' , loginController)
router.post('/register' , registerController);


router.post('/getUserData' , auth ,authController)



router.post('/apply-doctor' , auth ,applyDoctorController)

router.post('/get-all-notification' , auth ,getAllNotificationController)

router.post('/delete-all-notification' , auth ,deleteAllNotificationController)

router.get("/getAllDoctors", auth, getAllDoctorsController);

module.exports = router