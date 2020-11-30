const express = require('express');
const router = express.Router();
const {validRegister, validLogin,resetPasswordValidator, forgoPasswordValidator} = require('../helpers/valid');
const {activationController, registerController, loginController} = require('../controllers/auth.controller');

router.post('/register',validRegister,registerController);
router.post('/login',validLogin,loginController);
router.post('/activation',activationController);

module.exports = router