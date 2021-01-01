const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const routineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },

    history: [
      {
        date: Date,
        volume: {
          type: Number,
          default: 0,
        },
      },
    ],

    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

routineSchema.virtual('totalRoutines').get(function () {
  return this.history.length
})

routineSchema.virtual('repsByRoutineNumber').get(function () {
  return this.history.length % 3
})

module.exports = mongoose.model('Routine', routineSchema)
