const co = require('co')
const User = require('../models/userModel')
const CryptoJS = require('crypto-js')

module.exports = {
  update: (req, res) => {
    const { _id, phone, password } = req.body
    co(function* () {
      const isExistsPhone = yield User.findOne({ phone: phone }).select('phone')
      const user = yield User.findOne({ _id: _id })
      if (isExistsPhone && isExistsPhone._id != _id) {
        return Promise.reject({
          errors: [{
            param: 'phone',
            msg: 'Số điện thoại này đã được sử dụng',
          }]
        })
      }
      
      if (user.password !== password) {
        req.body.password = CryptoJS.AES.encrypt(
          password,
          process.env.PASSWORD_SECRET_KEY
        ).toString()
      }
      const users = yield User.findByIdAndUpdate({_id: _id}, req.body)
      return users
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },
  updateAvatar: (req, res) => {
    const { UID, image } = req.body
    co(function* () {
      const user = yield User.findByIdAndUpdate({ _id: UID }, { image: image })
      return user
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },
  delete: (req, res) => {
    co(function* () {
      yield User.deleteMany({_id: {$in: req.body}})
      const users = User.find()
      return users
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },
  getAll: (req, res) => {
    co(function* (){
      const users = yield User.find()
      const passwords = yield User.find().select('password')
      passwords.map((pass, i) => {
        const decryptedPass = CryptoJS.AES.decrypt(
          pass.password,
          process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        users[i].password = decryptedPass;
      })
      return users
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },
}