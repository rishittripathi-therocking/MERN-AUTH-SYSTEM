const express = require('express');
const router = express.Router();
const {validRegister, validLogin,resetPasswordValidator, forgetPasswordValidator} = require('../helpers/valid');
const {activationController, registerController, loginController, forgetController} = require('../controllers/auth.controller');

router.post('/register',validRegister,registerController);
router.post('/login',validLogin,loginController);
router.post('/activation',activationController);
//router.put('/password/forget',forgetPasswordValidator, forgetController)

module.exports = router