const User = require('../models/auth.model');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const {OAuth2Client} = require('google-auth-library');
const fetch = require('node-fetch');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {errorHandler} = require('../helpers/dbErrorHandling');
const {sgmail} = require('@sendgrid/mail');
sgmail.setApiKey(process.env.MAIL_KEY);


exports.registerController = (req,res) => {
    const {name,email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        })
    } else {
        User.findOne({
            email
        }).exec((err,user)=>{
            if(user) {
                return res.status(400).json({
                    error: "Email is taken"
                })
            }
        })
        const token = jwt.sign({
            name,
            email,
            password
        },
        process.env.JWT_ACCOUNT_ACTIVATION,
        {
            expiresIn: '15m'
        })

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: "Account Activation Link",
            html: `<h1>Please Click Link to Activate Your Account</h1>
                    <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                    <hr>
                    <p>This email contains sensitive info</p>
                    ${process.env.CLIENT_URL}`
        }

        sgmail.send(emailData).then(sent => {
            return res.json({
                message: `email has been sent to ${email}`
            })
        }).catch(err=>{
            return res.status(400).json({
                error: errorHandler(err)
            })
        });

    }
}