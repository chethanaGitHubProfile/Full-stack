const { validationResult } = require("express-validator");
const Product = require("../models/product-model");
const Invoice = require("../models/invoice-model");
const {
  productId,
  quantity,
  purchase_price,
} = require("../validations/grn-validation");
const invoiceCtrl = {};

invoiceCtrl.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { lineItems } = req.body;
    //console.log(lineItems);
    const invoice = new Invoice({
      lineItems: [],
    });

    let totalQuantity = 0;
    let totalPurchaseprice = 0;
    //iterrate through lineItems to calculate totalpurchaseprice
    for (const item of lineItems) {
      //fetch product details by productid
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      //update the item properties with fetched product details
      item.mrp = product.mrp;
      item.B2BPrice = product.B2BPrice;
      item.discount = product.discount;

      //calculate purchse_price with fetched product details
      item.purchase_Price = Math.abs(
        (item.discount / 100) * item.mrp - item.mrp
      );

      //Accumulate total qty and total purchase price
      totalQuantity += item.quantity;
      totalPurchaseprice += item.B2BPrice * item.quantity;
    }

    //assign updated lineItems to invoice.lineItems
    invoice.lineItems = lineItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      mrp: item.mrp,
      purchase_price: item.purchase_Price,
      discount: item.discount,
    }));

    invoice.totalPurchaseprice = totalPurchaseprice;
    invoice.totalQuantity = totalQuantity;

    //reduce the stock from each product
    for (const productData of lineItems) {
      const { productId, quantity } = productData;
      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: -quantity },
      });
    }
    await invoice.save();
    return res.status(200).json(invoice);
  } catch (err) {
    return res.status(500).json(err);
  }
};

invoiceCtrl.softDelete = async (req, res) => {
  try {
    const InvoiceId = req.params.InvoiceId;

    //Retrive the invoice
    const invoice = await Invoice.findById(InvoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    //iterate through line items and increment stock for each product
    for (const item of invoice.lineItems) {
      const { productId, quantity } = item;
      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: quantity },
      });
    }

    await invoice.save();
    return res
      .status(200)
      .json({ message: "Invoice soft deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
module.exports = invoiceCtrl;
