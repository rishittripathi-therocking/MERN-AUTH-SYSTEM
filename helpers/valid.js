const { removeLocalStorage } = require("../client/src/helpers/auth");

const {check} = require('express-validator');

exports.validRegister = [
    check('name','Name is Required').isEmpty().isLength({
        min: 3,
        max: 32
    }).withMessage('name must bebetween 3 to 32 characters'),
    check('email').isEmpty().withMessage('Must be a valid email address'),
    check('password','Password is Required').notEmpty(),
    check('password').isLength({
        min: 8,
    }).withMessage('Password mus contain at least 8 characters').matches(/\d/).withMessage('Password must contain a number')

]

exports.validLogin = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password','Password is Required').notEmpty(),
    check('password').isLength({
        min: 8,
    }).withMessage('Password mus contain at least 8 characters').matches(/\d/).withMessage('Password must contain a number')

]

exports.forgoPasswordValidator = [
    check('email').not().isEmpty().isEmail().withMessage('Must be a valid email address')
]

exports.resetPasswordValidator = [
    check('newPassword').isLength({
        min: 8,
    }).withMessage('Password mus contain at least 8 characters').matches(/\d/).withMessage('Password must contain a number')

]
