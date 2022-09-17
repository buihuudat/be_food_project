const mongoose = require('mongoose')

const Products = new mongoose.Schema({
  product: [{
    id: String,
    image: String,
    name: String,
    description: String,
    count: Number,
    price: Number,
    discount: Number
  }],
  amount: Number,
  voucher_used: String,
  status: {
    type: Boolean,
    default: false
  },
}, { timestamps: true })

const User_order = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [Products],
})

module.exports = mongoose.model('User_order', User_order)