const mongoose = require('mongoose')

const voucherModel = new mongoose.Schema({
  voucher: {
    type: String,
    unique: true,
    required: true,
  },
  count: Number,
  discount: Number,
  HSD: Date
}, {timestamps: true})

module.exports = mongoose.model('voucher', voucherModel)