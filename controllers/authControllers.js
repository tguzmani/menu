const User = require('../models/User')
const { genSalt, hash, compare } = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }

  let user = new User(req.body)
  const { password, confirmationPassword } = req.body

  try {
    if (password !== confirmationPassword) {
      return res.status(400).json({ message: "Passwords don't match" })
    }

    const salt = await genSalt(12)
    user.password = await hash(password, salt)

    await user.save()

    user.password = undefined

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.cookie('t', token, { expire: new Date() + 3600 })
    res.json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.signin = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }

  try {
    const { password, username, email } = req.body

    let user = await User.findOne({
      $or: [{ username }, { email }],
    })

    if (!user) {
      return res
        .status(400)
        .json({ message: 'There is no user with that email. Please sign up' })
    }

    const isMatch = await compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Email and password don't match" })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.cookie('t', token, { expire: new Date() + 3600 })

    return res.json(token)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
