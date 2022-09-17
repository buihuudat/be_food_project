const co = require('co')
const User = require('../models/userModel')
const User_feedback = require('../models/user_feedback')
const Notification = require('../models/notification')
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
  get: (req, res) => {
    co(function* () {
      const { id } = req.params
      const user = yield User.findById({_id: id}).select('fullname phone')
      return user
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

  feedback: (req, res) => {
    co(function* () {
      const createNewUserFeedback = yield User_feedback.create(req.body)
      return createNewUserFeedback
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  updateFeedback: (req, res) => {
    co(function* () {
      yield User_feedback.findByIdAndUpdate({_id: req.body._id}, { resolve: req.body.resolve })
      const feedbacks = yield User_feedback.find()
      return feedbacks
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  getAllFeedback: (req, res) => {
    co(function* () {
      const feedbacks = yield User_feedback.find()
      return feedbacks
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  createNotification: (req, res) => {
    co(function* () {
      const create = yield Notification.create(req.body)
      return create
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },

  updateNotification: (req, res) => {
    co(function* () {
      const update = yield Notification.findByIdAndUpdate({_id: req.body._id}, {resolve: req.body.resolve})
      return update
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  }
}