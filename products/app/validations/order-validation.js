const Order = require("../models/order-model");
const orderValidation = {
  products: {
    productOd: {
      notEmpty: {
        errorMessage: "Product id is required",
      },
      isMongoId: {
        errorMessage: "should be a valid mongodb id",
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
moduule.exports = orderValidation;
