const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const groupSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
)

module.exports = mongoose.model('Group', groupSchema)
