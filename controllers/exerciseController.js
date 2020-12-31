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
    .populate({ path: 'weights.weight', select: 'name value type' })
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

exports.getTotalWeight = async (req, res) => {
  Exercise.findById(req.params.exerciseId)
    .populate({ path: 'weights.weight', select: 'value' })
    .then(exercise => {
      if (!exercise)
        return res.status(400).json({ message: 'Exercise not found' })
      else res.send(exercise.totalWeight)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.createWeight = async (req, res) => {
  Exercise.findById(req.params.exerciseId)
    .populate({ path: 'weights.weight', select: 'name value type' })
    .select('weights')
    .then(exercise => {
      if (!exercise)
        return res.status(400).json({ message: 'Exercise not found' })
      else {
        const element = exercise.weights
          .filter(weight => weight.weight._id == req.params.weightId)
          .pop()

        if (element)
          return res
            .status(400)
            .json({ message: 'Weight already exists in exercise' })

        exercise.weights.push({
          _id: req.params.weightId,
          number: req.body.number,
        })

        exercise.save()
        res.send(exercise)
      }
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteWeight = async (req, res) => {
  Exercise.findById(req.params.exerciseId)
    .populate({ path: 'weights.weight', select: 'name value type' })
    .select('weights')
    .then(exercise => {
      if (!exercise)
        return res.status(400).json({ message: 'Exercise not found' })
      else {
        try {
          const elementId = exercise.weights
            .filter(weight => weight.weight._id == req.params.weightId)
            .pop()._id

          exercise.weights.pull({ _id: elementId })
          exercise.save()
          res.send(exercise)
        } catch (error) {
          return res
            .status(400)
            .json({ message: 'Weight not found in exercise' })
        }
      }
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
