const express = require('express');
const router = express.Router();
const {validRegister, validLogin,resetPasswordValidator, forgoPasswordValidator} = require('../helpers/valid');
const {activationController, registerController} = require('../controllers/auth.controller');

router.post('/register',validRegister,registerController);
router.post('/activation',validRegister,activationController);

module.exports = router