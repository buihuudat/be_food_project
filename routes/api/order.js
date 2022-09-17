const { validate } = require('../../models/user_order')
const router = require('express').Router()
const orderController = require('../../controllers/order')

router.post(
  '/create',
  validate,
  orderController.create
)

router.put(
  '/update/:id',
  validate,
  orderController.update
)

router.post(
  '/:id',
  validate,
  orderController.get
)

router.get(
  '/getAll',
  validate,
  orderController.getAll
)

module.exports = router