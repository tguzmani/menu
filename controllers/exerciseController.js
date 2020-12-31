const Exercise = require('../models/Exercise')

exports.createExercise = async (req, res) => {
  const exercise = Exercise({
    ...req.body,
    routine: req.params.routineId,
    user: req.userId,
  })

  exercise
    .save()
    .then(exercise => res.send(exercise))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readExercises = async (req, res) => {
  Exercise.find()
    .then(exercises => res.send(exercises))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readExercise = async (req, res) => {
  Exercise.findById(req.params.exerciseId)
    .then(exercise => {
      if (!exercise)
        return res.status(400).json({ message: 'Exercise not found' })
      else res.send(exercise)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.updateExercise = async (req, res) => {
  Exercise.findByIdAndUpdate(req.params.exerciseId, req.body, {
    new: true,
  })
    .then(exercise => {
      if (!exercise)
        return res.status(400).json({ message: 'Exercise not found' })
      else res.send(exercise)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteExercise = async (req, res) => {
  Exercise.findByIdAndDelete(req.params.exerciseId)
    .then(exercise => {
      if (!exercise)
        return res.status(400).json({ message: 'Exercise not found' })
      else res.send({ message: 'Exercise deleted' })
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
