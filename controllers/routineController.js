const Routine = require('../models/Routine')

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
