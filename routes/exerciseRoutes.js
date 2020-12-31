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
} = require('../controllers/exercisecontroller.js')

router.post('/:routineId', middleware, createExercise)
router.get('/all', middleware, readExercises)
router.get('/:exerciseId', middleware, readExercise)
router.put('/:exerciseId', middleware, updateExercise)
router.delete('/:exerciseId', middleware, deleteExercise)

module.exports = router
