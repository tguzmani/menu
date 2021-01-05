const Exercise = require('../models/Exercise')
const Weight = require('../models/Weight')
const mongoose = require('mongoose')

exports.createExercise = async (req, res) => {
  Exercise.findOne({ routine: req.params.routineId })
    .select('order')
    .sort({ order: -1 })
    .then(lastExercise => {
      const exercise = Exercise({
        ...req.body,
        routine: req.params.routineId,
        user: req.userId,
        order: lastExercise ? lastExercise.order + 1 : 1,
      })

      exercise
        .save()
        .then(exercise => res.send(exercise))
        .catch(error => res.status(500).json({ error: error.message }))
    })
    .catch(error => res.status(500).json({ error: error.message }))

  return
}

exports.readExercises = async (req, res) => {
  Exercise.find()
    .populate('weights.weight')
    .sort({ order: 1 })
    .then(exercises => {
      res.send(exercises)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readExercisesByRoutine = async (req, res) => {
  Exercise.find({ routine: req.params.routineId })

    .then(exercises => res.send(exercises))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readExercise = async (req, res) => {
  Exercise.findById(req.params.exerciseId)
    .populate('weights.weight')
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
      else res.send(exercise)
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

exports.moveDown = async (req, res) => {
  Exercise.findById(req.params.exerciseId)
    .then(exercise1 =>
      Exercise.findOne({
        order: { $gt: exercise1.order },
        routine: exercise1.routine,
      })
        .sort({ order: 1 })
        .then(exercise2 =>
          Exercise.findByIdAndUpdate(
            exercise1._id,
            { order: exercise2.order },
            { new: true }
          )
            .then(exercise1Updated =>
              Exercise.findByIdAndUpdate(
                exercise2._id,
                { order: exercise1.order },
                { new: true }
              )
                .then(exercise2Updated =>
                  res.send({ exercise1Updated, exercise2Updated })
                )
                .catch(error => res.status(500).json({ error: error.message }))
            )
            .catch(error => res.status(500).json({ error: error.message }))
        )
        .catch(error => res.status(500).json({ error: error.message }))
    )
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.moveUp = async (req, res) => {
  Exercise.findById(req.params.exerciseId)
    .then(exercise1 =>
      Exercise.findOne({
        order: { $lt: exercise1.order },
        routine: exercise1.routine,
      })
        .sort({ order: -1 })
        .then(exercise2 =>
          Exercise.findByIdAndUpdate(
            exercise1._id,
            { order: exercise2.order },
            { new: true }
          )
            .then(exercise1Updated =>
              Exercise.findByIdAndUpdate(
                exercise2._id,
                { order: exercise1.order },
                { new: true }
              )
                .then(exercise2Updated =>
                  res.send({ exercise1Updated, exercise2Updated })
                )
                .catch(error => res.status(500).json({ error: error.message }))
            )
            .catch(error => res.status(500).json({ error: error.message }))
        )
        .catch(error => res.status(500).json({ error: error.message }))
    )
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
        const weight = exercise.weights.find(
          weight => weight.weight._id == req.params.weightId
        )

        if (weight)
          return res
            .status(400)
            .json({ message: 'Weight already exists in exercise' })

        Weight.findById(req.params.weightId)
          .then(weight => {
            if (!weight)
              return res.status(400).json({ message: 'Weight not found' })

            if (weight.type === 'barbell' && req.body.number !== 1)
              return res
                .status(400)
                .json({ message: 'Barbell number cannot be different than 1' })

            exercise.weights.push({
              weight: {
                _id: req.params.weightId,
                value: weight.value,
                name: weight.name,
                type: weight.type,
              },
              number: req.body.number,
            })

            exercise.save()
            res.send(
              exercise.weights.find(
                weight => weight.weight._id == req.params.weightId
              )
            )
          })
          .catch(error => res.status(500).json({ error: error.message }))
      }
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.updateWeight = async (req, res) => {
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

          Exercise.findOneAndUpdate(
            {
              _id: req.params.exerciseId,
              'weights._id': elementId,
            },
            { $set: { 'weights.$.number': req.body.number } },
            { new: true }
          )
            .then(exercise => res.json(exercise))
            .catch(error => res.status(500).json({ error: error.message }))
        } catch (error) {
          return res
            .status(400)
            .json({ message: 'Weight not found in exercise' })
        }
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
          res.send(exercise.weights)
        } catch (error) {
          return res
            .status(400)
            .json({ message: 'Weight not found in exercise' })
        }
      }
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
