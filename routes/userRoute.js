const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { protectedRoute, isAdmin } = require('../middleware/authMiddleware');
const upload = require("../utils/fileUpload");


router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/seller', userController.sellerLogin);
router.post("/verify-email", userController.VerifyEmail);
router.get('/loggedin', userController.loginStatus);
router.get('/logout', userController.logout);

router.post('/send-message', userController.sendMessage);

router.post('/forgot-password', userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.get('/getuser', protectedRoute, userController.getUser);
router.get('/sell-amount', protectedRoute, userController.getUserBalance);

router.put('/update-profile', protectedRoute, upload.single('image'), userController.updateProfile);

// only accessible by admin
router.get('/users', protectedRoute, isAdmin, userController.getAllUsers);
router.get('/estimate-income', protectedRoute, isAdmin, userController.estimateIncome);


module.exports = router;