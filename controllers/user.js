const co = require('co')
const User = require('../models/userModel')
const CryptoJS = require('crypto-js')

module.exports = {
  update: (req, res) => {
    const { password } = req.body
    co(function* () {
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      ).toString()
      const users = yield User.findByIdAndUpdate({_id: req.body._id}, req.body)
      return users
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