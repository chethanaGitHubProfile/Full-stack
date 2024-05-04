/*const mongoose = require("mongoose");
const Product = require("../models/product-model");
const { model, Schema } = mongoose;
const cartSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      price: Number,
      discount: Number,
      quantity: Number,
    },
  ],
  TotalQuantity: Number,
  TotalAmount: Number,
});
const Cart = model("Cart", cartSchema);
module.exports = Cart;
*/
const { model, Schema } = require("mongoose");

const cartSchema = new Schema(
  {
    retailerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        Mrp: Number,
        Discount: Number,
        B2Bprice: Number,
      },
    ],
    TotalPrice: Number,
    orderPlaced: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Cart = model("Cart", cartSchema);
module.exports = Cart;
