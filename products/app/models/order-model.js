const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const orderSchema = new Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    payment: [],
    retailer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Confirm",
      enum: ["Confirm", "Invoiced", "Shipped", "delivered", "Cancel"],
    },
  },
  { timestamps: true }
);
const Order = model("Order", orderSchema);

module.exports = Order;
