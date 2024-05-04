const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ProductSchema = new Schema(
  {
    name: String,
    // imagePath: String,
    slug: {
      type: String,
      required: true,
    },
    mrp: Number,
    stock: {
      type: Number,
      default: 0,
    },
    reserveStock: {
      type: Number,
      default: 0,
    },
    discount: Number,
    B2BPrice: Number,
    // barcode: String,
    status: {
      type: String,
      enum: ["active", "Inactive"],
      default: "active",
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      require: [true, "catgeory is required"],
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);
const Product = model("Product", ProductSchema);
module.exports = Product;
