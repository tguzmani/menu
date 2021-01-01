const express = require('express')
const router = express.Router()

const { monitor } = require('../middleware/monitor')
const { auth } = require('../middleware/auth')

const middleware = [auth, monitor]

const {
  createExercise,
  readExercise,
  readExercises,
  updateExercise,
  deleteExercise,
  getTotalWeight,
  createWeight,
  updateWeight,
  deleteWeight,
} = require('../controllers/exercisecontroller.js')

router.post('/:routineId', middleware, createExercise)
router.get('/all', middleware, readExercises)
router.get('/:exerciseId', middleware, readExercise)
router.put('/:exerciseId', middleware, updateExercise)
router.delete('/:exerciseId', middleware, deleteExercise)

router.get('/:exerciseId/totalWeight', middleware, getTotalWeight)

router.post('/:exerciseId/:weightId', middleware, createWeight)
router.put('/:exerciseId/:weightId', middleware, updateWeight)
router.delete('/:exerciseId/:weightId', middleware, deleteWeight)

module.exports = router
