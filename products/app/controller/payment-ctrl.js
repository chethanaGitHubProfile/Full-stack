// require("dotenv").config();
// const stripSecretKey = process.env.STRIP_SECRET_KEY;
// const stripPublicKey = process.env.STRIP_PUBLIC_KEY;
// console.log(stripSecretKey, stripPublicKey);

// const strip = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const { validationResult } = require("express-validator");
// const payment = require("../models/payment-model");
// const Order = require("../models/order-model");
// const Cart = require("../models/order-model");
// const _ = require("lodash");
// const Payment = require("../models/payment-model");
// const paymentCtrl = {};
// paymentCtrl.create = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array });
//   }
//   //const body = _.pick(req.body, ["amount", "order"]);
//   const body = req.body;
//   const cart = await Cart.findById({ _id: body.cart });
//   try {
//     const session = await stripSecretKey.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: "Buying product",
//             },
//             unit_amount: cart.TotalPrice * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: "http://localhost:3000/cart/payment:success=true",
//       cancel_url: "http://localhost:3000/cart/payment:cancel=true",
//     });
//     const payment = new Payment(body);
//     payment.Retailers = req.user._id;
//     payment.transactiionId = session._id;
//     await payment.save();
//     res.json({ id: session.id, url: session.url });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// paymentCtrl.update = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const updatepayment = await Payment.findOneAndUpdate(
//       { cart: id },
//       { status: "successful" },
//       { new: true }
//     );
//     res.json(updatepayment);
//   } catch (err) {
//     res.status(500).json(e);
//   }
// };

// paymentCtrl.delete = async (req, res) => {
//   const id = req.paarms.id;
//   try {
//     const payment = await Payment.findOneAndUpdate({ transactiionId: id });
//     res.json(payment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// module.exports = paymentCtrl;
// ============================

// const express = require("express");
// const stripe = require("stripe");

// const stripe = stripe(process.env.STRIPE_KEY);
// const router = express.Router();

// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "T-shirt",
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${process.env.CLIENT_URL}/checkout-success`,
//     cancel_url: `${process.env.CLIENT_URL}/cart`,
//   });

//   res.send({ url: session.url });
// });

module.exports = router;
