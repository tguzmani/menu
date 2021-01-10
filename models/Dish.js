const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      unique: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 260,
    },

    group: {
      type: ObjectId,
      ref: 'Group',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Dish', dishSchema)
