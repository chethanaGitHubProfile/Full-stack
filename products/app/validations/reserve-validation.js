const Product = require("../models/product-model");
const reserveValidation = {
  productId: {
    notEmpty: {
      errorMessage: "productId is required",
    },
    custom: {
      options: async function (value, { req }) {
        const product = await Product.findOne({ _id: value });
        console.log(product);
        if (!product) {
          throw new Error("Product not found with the provided productId");
        } else {
          return true;
        }
      },
    },
  },
  reserveQuantity: {
    notEmpty: {
      errorMessage: "quantity is required",
    },
    custom: {
      options: async function (value, { req }) {
        if (!Number.isInteger(Number(value))) {
          throw new Error("quantity should be number");
        }
        return true;
      },
    },
  },
  startDate: {
    notEmpty: {
      errorMessage: "Startdate is required",
    },
    custom: {
      options: async function (value) {
        return value instanceof Date && !isNaN(value); //isNaN() returns true for values that are not numeric,
        // !isNaN() returns true for values that are numeric.
      },
      errorMessage: "Invalid start date",
    },
  },
  endDate: {
    notEmpty: {
      errorMessage: "endDate is required",
    },
    custom: {
      options: async function (value, { req }) {
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(value);
        if (endDate < startDate) {
          throw new Error("endDate must be greater than startDate");
        }
        return true;
      },
    },
  },
};

module.exports = reserveValidation;
