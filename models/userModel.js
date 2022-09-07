const mongoose = require('mongoose')

const UserAddress = new mongoose.Schema({
  city: String,
  district: String,
  ward: String,
  street: String,
  apartmentNumber: String,
  more: String
})

const UserModel = new mongoose.Schema({
  address: [UserAddress],
  fullname: String,
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  password: String,
  avatar: String,
  permission: {
    type: Number,
    default: 1
  }
}, {timestamps: true})

module.exports = mongoose.model('User', UserModel)