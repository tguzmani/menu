const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const weightSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ['plate', 'barbell', 'dumbbell', 'stack', 'other'],
    },

    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Weight', weightSchema)
