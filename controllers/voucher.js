const co = require("co");
const Voucher = require("../models/voucherModel");

module.exports = {
  create: (req, res) => {
    co(function* () {
      const isExists = yield Voucher.findOne({ voucher: req.body.voucher });
      if (isExists) {
        return Promise.reject("Voucher đã tồn tại");
      }
      const voucher = yield Voucher.create(req.body);
      return voucher;
    })
      .then((data) => res.status(201).json(data))
      .catch((err) => res.status(500).json(err));
  },

  update: (req, res) => {
    co(function* () {
      const voucher = yield Voucher.findByIdAndUpdate(
        { _id: req.body._id },
        req.body
      );
      return voucher;
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },

  delete: (req, res) => {
    co(function* () {
      yield Voucher.findByIdAndDelete({ _id: req.body._id });
      const voucher = Voucher.find();
      return voucher;
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },

  get: (req, res) => {
    co(function* () {
      const voucher = Voucher.findOne({ voucher: req.params.voucher });
      return voucher;
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },

  getAll: (req, res) => {
    co(function* () {
      const voucher = Voucher.find();
      return voucher;
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },
};
