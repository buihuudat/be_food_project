const co = require('co')
const Product = require('../models/productModel')

module.exports = {
  create: (req, res) => {
    co(function* () {
      const product = yield Product.create(req.body)
      return product
    })
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json(err))
  },
  update: (req, res) => {
    co(function* () {
      const product = yield Product.findByIdAndUpdate({_id: req.body.id}, req.body)
      return product
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },
  delete: (req, res) => {
    co(function* () {
      yield Product.findByIdAndDelete({_id: req.body._id})
      const product = Product.find()
      return product
    })
    .then((data) => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  },
  get: (req, res) => {
    
  },
  getAll: (req, res) => {
    co(function * () {
      const products = yield Product.find()
      return products
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
  }
}