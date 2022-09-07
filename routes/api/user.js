const validation = require('../../handlers/validation')
const userController = require('../../controllers/user')
const router = require('express').Router()

// get all users
router.get(
  '/getAll',
  validation,
  userController.getAll,
)

// update user
router.put(
  '/update',
  validation,
  userController.update,
)

// delete user
router.post(
  '/delete',
  validation,
  userController.delete
)

module.exports = router