const Dish = require('../models/Dish')

exports.createDish = async (req, res) => {
  const dish = Dish(req.body)

  dish
    .save()
    .then(dish => res.send(dish))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readDishes = async (req, res) => {
  Dish.find()
    .then(dishes => res.send(dishes))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readDish = async (req, res) => {
  Dish.findById(req.params.dishId)
    .then(dish => {
      if (!dish) return res.status(400).json({ message: 'Dish not found' })
      else res.send(dish)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.updateDish = async (req, res) => {
  Dish.findByIdAndUpdate(req.params.dishId, req.body, {
    new: true,
  })
    .then(dish => {
      if (!dish) return res.status(400).json({ message: 'Dish not found' })
      else res.send(dish)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteDish = async (req, res) => {
  Dish.findByIdAndDelete(req.params.dishId)
    .then(dish => {
      if (!dish) return res.status(400).json({ message: 'Dish not found' })
      else res.send(dish)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
