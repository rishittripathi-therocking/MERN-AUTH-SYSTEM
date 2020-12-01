const express = require('express');
const router = express.Router();
const {validRegister, validLogin,resetPasswordValidator, forgotPasswordValidator} = require('../helpers/valid');
const {activationController, registerController, loginController, forgotPasswordController} = require('../controllers/auth.controller');

router.post('/register',validRegister,registerController);
router.post('/login',validLogin,loginController);
router.post('/activation',activationController);
router.put('/password/forget',forgotPasswordValidator, forgotPasswordController);

module.exports = router