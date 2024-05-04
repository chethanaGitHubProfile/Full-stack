const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ReserveSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    reserveQuantity: Number,
    orderQuantity: {
      type: Number,
      default: 0,
    },
    remainingQuantity: {
      type: Number,
      default: 0,
    },
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,

    status: {
      type: String,
      enum: ["Pending", "Started", "Stopped", "Ended"],
      default: "Pending",
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Reserve = model("Reserve", ReserveSchema);
module.exports = Reserve;
