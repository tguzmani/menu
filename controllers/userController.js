const User = require('../models/User')

exports.readUser = async (req, res) => {
  User.findById(req.userId)
    .select('-password')
    .then(user => {
      if (!user) {
        res.status(400).send('User not found')
      } else {
        res.json(user)
      }
    })
    .catch(error => res.status(400).send('User not found'))
}
