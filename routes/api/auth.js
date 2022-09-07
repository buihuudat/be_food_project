const router = require('express').Router()
const { body } = require('express-validator')
const validation = require('../../handlers/validation')
const authController = require('../../controllers/auth')
const User = require('../../models/userModel')
const token = require('../../handlers/token')

router.post(
  '/signin',
  body('phone').trim().isLength({min: 10, max: 11}).withMessage(
    'Số điện thoại không hợp lệ'
  ),
  validation,
  authController.signin
)

router.post(
  '/signup',
  body('phone').trim().isLength({min: 10, max: 11}).withMessage(
    'Số điện thoại không hợp lệ'
  ),
  body('password').trim().isLength({min: 8}).withMessage(
    'Mật khẩu yêu cầu tối thiểu 8 ký tự'
  ),
  body('confirmPassword').trim().isLength({min: 8}).withMessage(
    'Mật khẩu yêu cầu tối thiểu 8 ký tự'
  ),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Mật khẩu không khớp');
    }
    return true;
  }),
  body('phone').custom(value => {
    return User.findOne({ phone: value }).then(user => {
      if (user) {
        return Promise.reject('Số điện thoại này đã được sử dụng');
      }
    })
  }),
  validation,
  authController.signup
)

router.post(
  '/verify-token',
  token.verifyToken,
  (req, res) => {
    res.status(200).json({ user: req.user })
  }
)

module.exports = router