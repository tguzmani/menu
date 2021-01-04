const express = require('express')
const router = express.Router()

const { monitor } = require('../middleware/monitor')
const { auth } = require('../middleware/auth')

const { readUser } = require('../controllers/userController')

router.get('/', auth, readUser)

module.exports = router
