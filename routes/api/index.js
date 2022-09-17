const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/user', require('./user'))
router.use('/product', require('./product'))
router.use('/voucher', require('./voucher'))
router.use('/user_order', require('./order'))

module.exports = router