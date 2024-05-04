const mongoose = require("mongoose");
const { purchase_price } = require("../validations/grn-validation");
const { Schema, model } = mongoose;
const invoiceSchema = new Schema(
  {
    RetailerId: {
      type: Schema.Types.ObjectId,
      ref: "Reatiler",
    },
    lineItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        mrp: Number,
        discount: Number,
        purchase_price: Number,
      },
    ],
    totalQuantity: Number,
    totalPurchaseprice: Number,
    payment: [],
  },
  { timestamps: true }
);
const Invoice = model("Invoice", invoiceSchema);
module.exports = Invoice;
