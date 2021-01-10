const express = require('express')
const router = express.Router()

const {
  createDish,
  readDish,
  readDishes,
  updateDish,
  deleteDish,
} = require('../controllers/dishController')

router.post('/', createDish)
router.get('/all', readDishes)
router.get('/:dishId', readDish)
router.put('/:dishId', updateDish)
router.delete('/:dishId', deleteDish)

module.exports = router
