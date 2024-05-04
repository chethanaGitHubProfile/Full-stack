const Cart = require("../models/cart-model");
const Product = require("../models/product-model");
const { validationResult } = require("express-validator");
const cartCtrl = {};

cartCtrl.addTocart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const body = req.body;
    const cartObj = { ...body };
    const productIds = cartObj.products.map((ele) => ele.productId);

    //fetch products from database using productIds
    const cartProducts = await Promise.all(
      productIds.map((id) => Product.findById(id))
    );

    let totalPrice = 0;
    const updateproducts = [];

    //update product details and calculate totel price
    for (let i = 0; i < cartProducts.length; i++) {
      const product = cartProducts[i];
      product.stock -= 1;
      await product.save();

      const cartProduct = {
        productId: product._id,
        quantity: 1,
        productDetails: product,
        mrp: product.mrp,
        disocunt: product.disocunt,
        B2BPrice: product.B2BPrice,
      };
      updateproducts.push(cartProduct);
      totalPrice += 1 * product.B2BPrice;
    }
    cartObj.totalPrice = totalPrice;

    let cart;

    if (req.user) {
      //if user logged in , find or create cart entry for teh retailer
      cart = await Cart.findOne({ retailerId: req.user.id });
      if (!cart) {
        cart = new Cart({
          retailerId: req.user.id,
          products: updateproducts,
          totalPrice: totalPrice,
        });
      } else {
        //if user not logged in , create new cart with empty retailer id
        cart.products.push(...updateproducts);
        cart.totalPrice += totalPrice;
      }
    } else {
      //if user is not logged in , create a new cart with empty retailer id
      cart = new Cart({
        retailerId: null,
        products: updateproducts,
        totalPrice: totalPrice,
      });
    }
    await cart.save();
    return res.status(200).json({
      success: true,
      message: "cart updated successfully",
      cart: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

cartCtrl.getCartDetails = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("User:", req.user);
    //find cart entry for retailer
    let cart = await Cart.findOne({ retailerId: id });
    // console.log("ca", cart);

    //if cart does not exist, return empty cart
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "cart is empty",
        cart: { products: [], totalPrice: 0 },
      });
    }

    //if cart exists, return cart details
    return res.status(200).json({
      success: true,
      message: "cart details fetched successfully",
      cart: cart.toObject(), //converts document to plain js
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
module.exports = cartCtrl;
