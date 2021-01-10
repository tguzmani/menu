const express = require('express')
const router = express.Router()

const {
  createGroup,
  readGroup,
  readGroups,
  updateGroup,
  deleteGroup,
} = require('../controllers/groupController')

router.post('/', createGroup)
router.get('/all', readGroups)
router.get('/:groupId', readGroup)
router.put('/:groupId', updateGroup)
router.delete('/:groupId', deleteGroup)

module.exports = router
