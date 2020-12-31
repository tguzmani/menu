const { check, oneOf, body } = require('express-validator')

exports.authSignUpValidator = [
  check('firstName', 'Please insert a first name').notEmpty(),
  check('lastName', 'Please insert a last name').notEmpty(),
  check('username', 'Please insert a username').notEmpty(),
  check('password', 'Please insert a password').notEmpty(),
  check('password', 'Password must be at least 6 characters long').isLength({
    min: 6,
  }),
  check('confirmationPassword', 'Please confirm your password').notEmpty(),
  check('email', 'Please insert a valid email').isEmail(),
]

exports.authSignInValidator = [
  oneOf([
    body('email', 'Please insert a valid email').isEmail(),
    body('username', 'Please insert a valid email').notEmpty(),
  ]),
  check('password', 'Password is required').notEmpty(),
]
