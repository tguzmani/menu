const Weight = require('../models/Weight')

exports.createWeight = async (req, res) => {
  const weight = Weight({ ...req.body, user: req.userId })

  weight
    .save()
    .then(weight => res.send(weight))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readWeights = async (req, res) => {
  Weight.find()
    .sort({ name: 1 })
    .then(weights => res.send(weights))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readWeight = async (req, res) => {
  Weight.findById(req.params.weightId)
    .then(weight => {
      if (!weight) return res.status(400).json({ message: 'Weight not found' })
      else res.send(weight)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.updateWeight = async (req, res) => {
  Weight.findByIdAndUpdate(req.params.weightId, req.body, {
    new: true,
  })
    .then(weight => {
      if (!weight) return res.status(400).json({ message: 'Weight not found' })
      else res.send(weight)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteWeight = async (req, res) => {
  Weight.findByIdAndDelete(req.params.weightId)
    .then(weight => {
      if (!weight) return res.status(400).json({ message: 'Weight not found' })
      else res.send({ message: 'Weight deleted' })
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
