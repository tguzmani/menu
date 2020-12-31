const express = require('express')
const router = express.Router()

const { monitor } = require('../middleware/monitor')
const { signup, signin } = require('../controllers/authController')

const {
  authSignUpValidator,
  authSignInValidator,
} = require('../validation/auth')

router.post('/signup', authSignUpValidator, signup)
router.post('/signin', authSignInValidator, signin)

module.exports = router
