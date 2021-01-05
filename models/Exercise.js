const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: 'New Exercise',
    },

    order: {
      type: Number,
      default: 0,
    },

    repetitions: {
      type: Number,
      required: true,
      default: 0,
    },

    weights: [
      {
        weight: {
          type: ObjectId,
          ref: 'Weight',
        },
        number: Number,
      },
    ],

    sets: {
      type: Number,
      required: true,
      default: 0,
    },

    routine: {
      type: ObjectId,
      ref: 'Routine',
      required: true,
    },

    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },

  { timestamps: true }
)

exerciseSchema.virtual('totalWeight').get(function () {
  return this.weights.reduce(
    (sum, weight) => sum + weight.weight.value * weight.number,
    0
  )
})

exerciseSchema.virtual('totalVolume').get(function () {
  return this.weights.reduce(
    (sum, weight) =>
      sum + weight.weight.value * weight.number * this.repetitions * this.sets,
    0
  )
})

exerciseSchema.methods.totalVolumeByReps = function (reps) {
  return this.weights.reduce(
    (sum, weight) =>
      sum +
      weight.weight.value *
        weight.number *
        (this.repetitions + reps) *
        this.sets,
    0
  )
}

module.exports = mongoose.model('Exercise', exerciseSchema)
