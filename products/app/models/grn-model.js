const mongoose = require("mongoose");
const Product = require("../models/product-model");
const { Schema, model } = mongoose;

const grnSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        status: {
          type: String,
          enum: ["Approved", "Rejected"],
          default: "Approved",
        },
        mrp: Number,
        margin: Number,
        quantity: Number,
        purchase_price: Number,
        barcode: String,
      },
    ],
    totalQuantity: Number,
    totalPurchasePrice: Number,
  },
  { timestamps: true }
);

const GRN = model("GRN", grnSchema);
module.exports = GRN;
