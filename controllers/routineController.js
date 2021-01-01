const Routine = require('../models/Routine')
const Exercise = require('../models/Exercise')

exports.createRoutine = async (req, res) => {
  const routine = Routine({ ...req.body, user: req.userId })

  routine
    .save()
    .then(routine => res.send(routine))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readRoutines = async (req, res) => {
  Routine.find()
    .then(routines => res.send(routines))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readRoutine = async (req, res) => {
  Routine.findById(req.params.routineId)
    .then(routine => {
      if (!routine)
        return res.status(400).json({ message: 'Routine not found' })
      else res.send(routine)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.updateRoutine = async (req, res) => {
  Routine.findByIdAndUpdate(req.params.routineId, req.body, {
    new: true,
  })
    .then(routine => {
      if (!routine)
        return res.status(400).json({ message: 'Routine not found' })
      else res.send(routine)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteRoutine = async (req, res) => {
  Routine.findByIdAndDelete(req.params.routineId)
    .then(routine => {
      if (!routine)
        return res.status(400).json({ message: 'Routine not found' })
      else res.send({ message: 'Routine deleted' })
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.createSession = async (req, res) => {
  Routine.findById(req.params.routineId)
    .then(routine => {
      if (!routine)
        return res.status(400).json({ message: 'Routine not found' })

      Exercise.find({ routine: req.params.routineId })
        .populate({ path: 'weights.weight', select: 'name value type' })
        .then(exercises => {
          const volume = exercises.reduce(
            (total, exercise) =>
              total + exercise.totalVolumeByReps(routine.repsByRoutineNumber),
            0
          )
          Routine.findByIdAndUpdate(
            req.params.routineId,
            {
              $push: { history: { date: Date.now(), volume } },
            },
            { new: true }
          )
            .then(routine => {
              if (!routine)
                return res.status(400).json({ message: 'Routine not found' })
              else res.send(routine)
            })
            .catch(error => res.status(500).json({ error: error.message }))
        })
        .catch(error => res.status(500).json({ error: error.message }))
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.popSession = async (req, res) => {
  Routine.findByIdAndUpdate(
    req.params.routineId,
    {
      $pop: { history: 1 },
    },
    { new: true }
  )
    .then(routine => {
      if (!routine)
        return res.status(400).json({ message: 'Routine not found' })
      else res.send(routine)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
