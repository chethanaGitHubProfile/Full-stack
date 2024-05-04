const GRN = require("../models/grn-model");
const Product = require("../models/product-model");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const grnCtrl = {};

grnCtrl.list = async (req, res) => {
  try {
    const grn = await GRN.find();
    return res.status(200).json(grn);
  } catch (error) {
    return res.status(500).json(error);
  }
};

grnCtrl.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { products } = req.body;

    // Create a single GRN
    const grn = new GRN({
      products: [],
    });

    let totalQuantity = 0;
    let totalPurchasePrice = 0;
    products.forEach((elm, idx) => {
      elm.purchase_price = Math.abs(elm.margin / 100 - 100 - elm.mrp);
      (totalQuantity += elm.quantity),
        (totalPurchasePrice += elm.purchase_price);
    });
    console.log(products);

    // Set the calculated total quantity and purchase price to the GRN object
    grn.totalQuantity = totalQuantity;
    grn.totalPurchasePrice = totalPurchasePrice;
    console.log("PurchasePrice", totalPurchasePrice);
    grn.products = products;

    // Update the stock for each product
    for (const productData of products) {
      const { productId, quantity } = productData;
      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: quantity },
      });
    }
    console.log(grn);
    await grn.save();
    return res.status(200).json(grn);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server Error");
  }
};

module.exports = grnCtrl;
