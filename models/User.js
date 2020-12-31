const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },

    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
