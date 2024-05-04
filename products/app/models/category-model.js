const { uniqueId, lowerCase } = require("lodash");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
      // unique: true,
    },
    // slug: {
    //   type: String,
    //   lowerCase: true,
    // },
    status: { type: String, default: "active" },
    imagePath: String,
  },
  { timestamps: true }
);
const Category = model("Category", CategorySchema);
module.exports = Category;
