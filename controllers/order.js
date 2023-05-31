const co = require("co");
const UserOrder = require("../models/user_order");

module.exports = {
  create: (req, res) => {
    const { user, products } = req.body;
    co(function* () {
      const isUserOrder = yield UserOrder.find({ user: user }).count();
      if (!isUserOrder) {
        const createNewOrder = yield UserOrder.create(req.body);
        return createNewOrder;
      }
      const updateOrder = yield UserOrder.findOneAndUpdate(
        { user: user },
        {
          $push: { products: products },
        }
      );
      return updateOrder;
    })
      .then((data) => res.status(201).json(data))
      .catch((err) => res.status(500).json(err));
  },

  update: (req, res) => {
    co(function* () {
      yield UserOrder.findOneAndUpdate(
        {
          "products._id": req.body.id_product,
        },
        {
          $set: {
            "products.$.status": req.body.status,
          },
        }
      );
      const orders = yield UserOrder.find();
      return orders;
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },

  get: (req, res) => {
    const { id } = req.params;
    co(function* () {
      const order = yield UserOrder.findOne({ user: id });
      return order ? order : [];
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },

  getAll: (req, res) => {
    co(function* () {
      const userOrders = yield UserOrder.find();
      return userOrders;
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).json(err));
  },
};
