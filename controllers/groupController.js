const Group = require('../models/Group')
const Dish = require('../models/Dish')

exports.createGroup = async (req, res) => {
  const group = Group(req.body)

  group
    .save()
    .then(group => res.send(group))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readGroups = async (req, res) => {
  Group.find()
    .then(groups => res.send(groups))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readGroup = async (req, res) => {
  Group.findById(req.params.groupId)
    .then(group => {
      if (!group) return res.status(400).json({ message: 'Group not found' })
      else res.send(group)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.updateGroup = async (req, res) => {
  Group.findByIdAndUpdate(req.params.groupId, req.body, {
    new: true,
  })
    .then(group => {
      if (!group) return res.status(400).json({ message: 'Group not found' })
      else res.send(group)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteGroup = async (req, res) => {
  Dish.deleteMany({ group: req.params.groupId }, () =>
    Group.findByIdAndDelete(req.params.groupId)
      .then(group => {
        if (!group) return res.status(400).json({ message: 'Group not found' })
        else res.send(group)
      })
      .catch(error => res.status(500).json({ error: error.message }))
  )
}
