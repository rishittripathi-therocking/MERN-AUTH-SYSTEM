const User = require('../models/auth.model');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const {OAuth2Client} = require('google-auth-library');
const fetch = require('node-fetch');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {errorHandler} = require('../helpers/dbErrorHandling');
const sgmail = require('@sendgrid/mail');
sgmail.setApiKey(process.env.MAIL_KEY);




exports.registerController = (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    console.log(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      User.findOne({
        email
      }).exec((err, user) => {
        if (user) {
          return res.status(400).json({
            errors: 'Email is taken'
          });
        }
      });
  
      const token = jwt.sign(
        {
          name,
          email,
          password
        },
        process.env.JWT_ACCOUNT_ACTIVATION,
        {
          expiresIn: '5m'
        }
      );
  
      const emailData = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'Account activation link',
        html: `
                  <h1>Please use the following to activate your account</h1>
                  <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                  <hr />
                  <p>This email may containe sensetive information</p>
                  <p>${process.env.CLIENT_URL}</p>
              `
      };
  
      sgmail
        .send(emailData)
        .then(sent => {
          return res.json({
            message: `Email has been sent to ${email}`
          });
        })
        .catch(err => {
          return res.status(400).json({
            success: false,
            errors: errorHandler(err),
            msg:`${process.env.MAIL_KEY}`
          });
        });
    }
  };

  exports.activationController = (req, res) => {
    const { token } = req.body;
  
    if (token) {
      jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
        if (err) {
          console.log('Activation error');
          return res.status(401).json({
            errors: 'Expired link. Signup again'
          });
        } else {
          const { name, email, password } = jwt.decode(token);
  
          console.log(email);
          const user = new User({
            name,
            email,
            password
          });
  
          user.save((err, user) => {
            if (err) {
              console.log('Save error', errorHandler(err));
              return res.status(401).json({
                errors: errorHandler(err)
              });
            } else {
              return res.json({
                success: true,
                message: user,
                message: 'Signup success'
              });
            }
          });
        }
      });
    } else {
      return res.json({
        message: 'error happening please try again'
      });
    }
  };

exports.loginController = (req,res) => {
    const {email,password} =  req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        })
    } else {
        User.findOne({
            email
        }).exec((err,user) => {
            if(err || !user) {
                return res.status(400).json({
                    error:'User with that email does not exists, Please Sign Up'
                })
            }

            if(!user.authenticate(password)){
                return res.status(400).json({
                    error: 'Email and password do not match'
                })
            }

            const token =jwt.sign({
                _id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            })
            const {_id, name,email, role} = user 
            return res.json({
                _id,
                name,
                email,
                role
            })
        })
    }
}


exports.forgotPasswordController = (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      User.findOne(
        {
          email
        },
        (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: 'User with that email does not exist'
            });
          }
  
          const token = jwt.sign(
            {
              _id: user._id
            },
            process.env.JWT_RESET_PASSWORD,
            {
              expiresIn: '10m'
            }
          );
  
          const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Password Reset link`,
            html: `
                      <h1>Please use the following link to reset your password</h1>
                      <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                      <hr />
                      <p>This email may contain sensetive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `
          };
  
          return user.updateOne(
            {
              resetPasswordLink: token
            },
            (err, success) => {
              if (err) {
                console.log('RESET PASSWORD LINK ERROR', err);
                return res.status(400).json({
                  error:
                    'Database connection error on user password forgot request'
                });
              } else {
                sgMail
                  .send(emailData)
                  .then(sent => {
                    // console.log('SIGNUP EMAIL SENT', sent)
                    return res.json({
                      message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                    });
                  })
                  .catch(err => {
                    // console.log('SIGNUP EMAIL SENT ERROR', err)
                    return res.json({
                      message: err.message
                    });
                  });
              }
            }
          );
        }
      );
    }
  };