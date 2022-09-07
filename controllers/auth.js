const co = require('co')
const User = require('../models/userModel')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

module.exports = {
  signup: (req, res) => {
    const { password } = req.body
    co(function* () {
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY,
      )

      const user = User.create(req.body)
      const token = jwt.sign(
        { id: user._id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: '24h' }
      )

      const data = yield {user, token}
      return data
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  signin: async (req, res) => {
    const { phone, password } = req.body
    try {
      const user = await User.findOne({ phone: phone })
      
      if (!user) {
        return res.status(401).json({
          errors: [{
            param: 'phone',
            msg: 'Số điện thoại chưa được sử dụng để đăng nhập'
          }]
        })
      }

      const decryptedPass = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8)

      if (decryptedPass !== password) {
        return res.status(401).json({
          errors: [
            {
              param: 'password',
              msg: 'Mật khẩu không đúng',
            }
          ]
        })
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: '24h' }
      )

      res.status(200).json({user, token})
    } catch (error) {
      res.status(500).json(error)
    }
  }
}