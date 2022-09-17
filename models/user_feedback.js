const mongoose = require('mongoose')

const User_Feedback = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  resolve: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('User_feedback', User_Feedback)