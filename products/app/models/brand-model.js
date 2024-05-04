const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const BrandSchema = new Schema({
  name: String,
  description: String,
  imagePath: String,
  status: { type: String, enum: ["active", "In_active"], default: "active" },
  isDeleted: { type: String, default: false },
  deletedAt: { type: String, default: null },
});
const Brand = model("Brand", BrandSchema);
module.exports = Brand;
