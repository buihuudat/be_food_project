const mongoose = require('mongoose')

const Notification = new mongoose.Schema({
  content: String,
  user: String
}, {timestamps: true})

module.exports = mongoose.model('Notification', Notification)