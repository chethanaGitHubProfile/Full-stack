/*const User = require("../models/user-model");
const Product = require("../models/product-model");
const mongoose = require("mongoose");

const cartValidation = {
  products: {
    productId: {
      notEmpty: {
        errorMessage: "productId is required",
      },
      isMongoId: {
        errorMessage: "should be a valid mongodb id",
      },
    },
    quantity: {
      notEmpty: {
        errorMessage: "Quantity is required",
      },
      custom: {
        options: (value) => {
          if (value <= 0) {
            throw new Error("Quantity must be greater than 0");
          }
          return true;
        },
      },
    },
  },
};

module.exports = {
  cartValidation: cartValidation,
};
*/

const User = require("../models/user-model");
const Product = require("../models/product-model");
const mongoose = require("mongoose");

const cartValidation = {
  products: {
    productId: {
      notEmpty: {
        errorMessage: "productId is required",
      },
      isMongoId: {
        errorMessage: "should be a valid mongodb id",
      },
    },
    quantity: {
      custom: {
        options: (value) => {
          if (value <= 0) {
            throw new Error("Quantity must be greater than 0");
          }
          return true;
        },
      },
    },
  },
};

const cartUpdate = {
  products: {
    productId: {
      isMongoId: {
        errorMessage: "Should be avalid mongodb id",
      },
    },
    quantity: {
      custom: {
        options: (value) => {
          if (value <= 0) {
            throw new Error("Quantity must be greater than zero");
          }
          return true;
        },
      },
    },
  },
};

module.exports = {
  cartValidation: cartValidation,
  cartUpdate: cartUpdate,
};
