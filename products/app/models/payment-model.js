const mongoose = require("mongoose");
const { Retailers } = require("../../utils/roles");
const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Credit", "Debit"],
      default: "Debit",
    },
    transactiionId: String,
    amount: Number,
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    Retailers: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      deeafult: "pending",
    },
  },
  { timestamps: true }
);

const Payment = model("Payment", paymentSchema);
module.exports = Payment;
