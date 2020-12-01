const express = require('express');
const router = express.Router();
const {validRegister, validLogin,resetPasswordValidator, forgotPasswordValidator} = require('../helpers/valid');
const {activationController, registerController, loginController, forgotPasswordController, resetPasswordController, googleController} = require('../controllers/auth.controller');

router.post('/register',validRegister,registerController);
router.post('/login',validLogin,loginController);
router.post('/activation',activationController);
router.put('/password/forget',forgotPasswordValidator, forgotPasswordController);
router.put('/password/reset',resetPasswordValidator, resetPasswordController);
router.post('/googlelogin', googleController)

module.exports = router