const express = require('express')
const router = express.Router()

const { monitor } = require('../middleware/monitor')
const { auth } = require('../middleware/auth')

const middleware = [auth, monitor]

const {
  createRoutine,
  readRoutine,
  readRoutines,
  updateRoutine,
  deleteRoutine,
  createSession,
  popSession,
} = require('../controllers/routineController')

router.post('/', middleware, createRoutine)
router.get('/all', middleware, readRoutines)
router.get('/:routineId', middleware, readRoutine)
router.put('/:routineId', middleware, updateRoutine)
router.delete('/:routineId', middleware, deleteRoutine)

router.put('/:routineId/createSession', middleware, createSession)
router.put('/:routineId/popSession', middleware, popSession)

module.exports = router
