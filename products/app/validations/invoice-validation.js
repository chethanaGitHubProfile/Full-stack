const Invoice = require("../models/invoice-model");
const InvoiceValidation = {
  customer: {
    notEmpty: {
      errorsMessage: "Customer is required",
    },
  },
  lineItems: [
    {
      product: {
        notEmpty: {
          errorMessage: "Product is required",
        },
      },
    },
  ],
};
