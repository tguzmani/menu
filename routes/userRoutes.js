const express = require('express')
const router = express.Router()

const { monitor } = require('../middleware/monitor')
const { auth } = require('../middleware/auth')

const { readUser } = require('../controllers/userControllers')

router.get('/:userId', auth, readUser)

module.exports = router
