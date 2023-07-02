const mongoose = require("mongoose");

const Products = new mongoose.Schema(
  {
    product: [
      {
        id: String,
        image: String,
        name: String,
        description: String,
        count: Number,
        price: Number,
        discount: Number,
      },
    ],
    amount: Number,
    voucher_used: String,
    discounted: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Chờ xác nhận", "Đang giao", "Đã hủy", "Hoàn tất"],
      default: "Chờ xác nhận",
    },
    reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User_order = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [Products],
});

module.exports = mongoose.model("User_order", User_order);
