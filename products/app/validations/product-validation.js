const Product = require("../models/product-model");
const productSchema = {
  name: {
    notEmpty: {
      errorMessage: "product name is required",
    },
    trim: true,
    custom: {
      options: async function (value, { req }) {
        const product = await Product.findOne({ productName: value });
        if (!product) {
          return true;
        } else {
          throw new Error("product name already exist");
        }
      },
    },
  },
  stock: Number,
  // imagePath: String,
  mrp: {
    notEmpty: {
      errorMessage: "Mrp is required",
    },
    custom: {
      options: async function (value) {
        if (value <= 0) {
          throw new Error("Mrp must be greater then 0");
        } else {
          return true;
        }
      },
    },
  },
  discount: {
    notEmpty: {
      errorMessage: "discount is required",
    },
    custom: {
      options: async function (value) {
        if (value <= 0) {
          throw new Error("discount must be greater then 0");
        } else {
          return true;
        }
      },
    },
  },
  B2BPrice: Number,
};

module.exports = productSchema;
