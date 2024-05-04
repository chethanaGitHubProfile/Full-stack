/*const { body,validationResult} = require("express-validator");
const Product = require("../models/product-model");


const grnValidationSchema = [{
    productId: body('productId')
        .notEmpty().withMessage("Product Id is required") // Ensures productId is not empty
        .custom(async (value, { req }) => {
            const productId = await Product.find({_id: value});
            if (!productId) {
                throw new Error("Product not found");
            }
        }),

    mrp: body('mrp')
        .notEmpty().withMessage("MRP is required")
        .isNumeric().withMessage("MRP should be a number")
        .custom(value => {
            if (value <= 0) {
                throw new Error("MRP can not be less than or equal to 0");
            }
            return true;
        }),

    margin: body('margin')
        .notEmpty().withMessage("Margin can not be empty")
        .isNumeric().withMessage("Margin should be a number")
        .custom(value => {
            if (value <= 0) {
                throw new Error("Margin can not be less than or equal to 0");
            }
            return true;
        }),

    quantity: body('quantity')
        .notEmpty().withMessage("Quantity can not be empty")
        .isNumeric().withMessage("Quantity should be a number")
        .custom(value => {
            if (value <= 0) {
                throw new Error("Quantity can not be less than or equal to 0");
            }
            return true;
        }),

    barcode: body('barcode').optional()
}];

module.exports = grnValidationSchema;*/

const GRN = require("../models/grn-model");
const Product = require("../models/product-model");
const { validationResult } = require("express-validator");
//const productSchema = require("../validations/product-validation")
const { Schema } = require("mongoose");
const grnValidationSchema = {
  date: {
    type: Date,
    default: Date.now,
  },
  productId: {
    in: ["body"],
  },
  quantity: {
    in: ["body"],
  },
  mrp: {
    in: ["body"],
  },
  margin: {
    in: ["body"],
  },
  barcode: {
    in: ["body"],
  },
  purchase_price: Number,

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
};

module.exports = grnValidationSchema;
