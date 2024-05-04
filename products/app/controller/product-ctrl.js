const { validationResult } = require("express-validator");
const Product = require("../models/product-model");
const Order = require("../models/order-model");
const { discount, B2BPrice } = require("../validations/product-validation");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");
const mongoose = require("mongoose");
const sharp = require("sharp");
const productCtrl = {};

//list
productCtrl.list = async (req, res) => {
  try {
    // const search = req.query.search || "";
    // const sortBy = req.query.sortBy || "name";
    // const order = req.query.order || 1;
    // const searchQuery = { name: { $regex: search, $options: "i" } };
    // const sortQuery = {};
    // sortQuery[sortBy] = order === "asc" ? 1 : -1;
    const products = await Product.find()
      // .sort(searchQuery)
      // .limit(10)
      .select("-photo")
      .limit(12)
      // .populate("categoryId")
      .sort({ createdAt: -1 });
    console.log("products", products);
    return res.status(200).json(
      // totalProductCount: products.length,
      // message: "All Products",
      products
    );
  } catch (err) {
    return res.json(err);
  }
};

//productCtrl is a asynchronus function responsible for creating a new product
productCtrl.create = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with your secret key
  req.user = decoded;

  try {
    const { name, slug, mrp, discount, categoryId } = req.fields;
    console.log("body", req.fields);

    if (!req.files) {
      return res.status(400).json({ errors: [{ msg: "No file uploaded" }] });
    }

    const { photo } = req.files;
    console.log("photo:", photo);
    //it calculates B2Bprice
    const B2BPrice = Math.abs(Math.round((discount / 100) * mrp - mrp));
    //console.log(B2BPrice);

    //creates a new product object using request object
    const products = new Product({
      ...req.fields,
      slug: slugify(name),
      B2BPrice: B2BPrice,
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    //attempts to save the product in db
    await products.save();
    res.json({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

productCtrl.singleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).select(
      "-photo"
    );
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//get product photo
productCtrl.productPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    const maxWidth = 300;
    const maxHeight = 300;

    product.photo = await sharp(product.photo)
      .resize(maxWidth, maxHeight, {
        fit: sharp.fit.inside, // Maintain aspect ratio and fit inside the specified dimensions
        withoutEnlargement: true, // Don't enlarge images smaller than the specified dimensions
      })
      .toBuffer();
    return res.status(200).json(product.photo.data);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while fetching photo", error });
  }
};

//update
productCtrl.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, slug, mrp, discount, categoryId } = req.fields;
    //console.log("body", req.fields);

    if (!req.files) {
      return res.status(400).json({ errors: [{ msg: "No file uploaded" }] });
    }

    const { photo } = req.files;
    //console.log("photo:", photo);
    //it calculates B2Bprice
    const B2BPrice = Math.abs(Math.round((discount / 100) * mrp - mrp));
    //console.log(B2BPrice);

    //creates a new product object using request object
    const products = await Product.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
        B2BPrice: B2BPrice,
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    //attempts to save the product in db
    await products.save();
    res.json({
      success: true,
      message: "Product created successfully",
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

productCtrl.delete = async (req, res) => {
  const id = req.id;
  try {
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    res.json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (err) {
    res.json(err);
  }
};

//productCtrl is asynchronous function responsible for softDelete.
productCtrl.softDelete = async (req, res) => {
  //extracts id from  requested url
  const id = req.params.id;
  try {
    //it sets isDeleted to true and deleted Date
    const product = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

//filter product controller
productCtrl.productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.B2BPrice = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    console.log("prod", products);
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Error while fetching filter", error });
  }
};

//payment geteway api
productCtrl.brainTreeToken = (req, res) => {
  try {
    // gateway.clientToken.generate({}, function (err, response) {
    //   if (err) {
    //     res.status(500).json(err);
    //   } else {
    //     res.json(response);
    //   }
    // });
    return true;
  } catch (error) {}
};

productCtrl.brainTreePayment = (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.B2BPrice;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total.toFixed(2),
        paymentMenthodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new Order({
            products: cart,
            payment: result,
            retailer: req.user._id,
          }).save();
          return res.json({ ok: true });
        } else {
          return res.status(500).json(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = productCtrl;
