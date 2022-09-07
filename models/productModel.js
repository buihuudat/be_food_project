const mongoose = require('mongoose')

const Product = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  type: String,
  image: String,
  discount: {
    type: Number,
    default: 0
  },
  rateCount: {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 0
  },
  countCartUser: {
    type: Number,
    default: 1
  },
  selling: {
    type: Number,
    default: 0
  },
}, {timestamps: true})

module.exports = mongoose.model('Product', Product)