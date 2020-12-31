const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    repetitions: {
      type: Number,
      required: true,
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

module.exports = mongoose.model('Exercise', exerciseSchema)
