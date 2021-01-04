const express = require('express')
const router = express.Router()

const { monitor } = require('../middleware/monitor')
const { auth } = require('../middleware/auth')

const middleware = [auth, monitor]

const {
  createWeight,
  readWeight,
  readWeights,
  updateWeight,
  deleteWeight,
} = require('../controllers/weightController')

router.post('/', middleware, createWeight)
router.get('/all', middleware, readWeights)
router.get('/:weightId', middleware, readWeight)
router.put('/:weightId', middleware, updateWeight)
router.delete('/:weightId', middleware, deleteWeight)

module.exports = router
