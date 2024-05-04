const Payment = require("../models/payment-model");
const paymenttypeSchema = {
  notEmpty: {
    errorMessage: "Payment type should not be empty",
  },
};

const amountSchema = {
  notEmpty: {
    errorMessage: "Amount should not be empty",
  },
};

const cartSchema = {
  notEmpty: {
    errorMessage: "Order shouldn't be empty",
  },
  isMongoId: {
    errorMessage: "Order id should be valid",
  },
};

const paymentValidation = {
  type: paymenttypeSchema,
  cart: cartSchema,
};
module.exports = paymentValidation;
