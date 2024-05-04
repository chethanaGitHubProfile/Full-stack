require("dotenv").config();
const express = require("express");
const { checkSchema } = require("express-validator");
const cors = require("cors");
const dotenv = require("dotenv");
const formidableMiddleware = require("express-formidable");

//configure
dotenv.config();
const configureDB = require("./app/config/db");
const roles = require("./utils/roles");
// const stripSecretKey = require("./app/controller/payment-ctrl");

const app = express();
app.use(express.json()); // used to read from DB
app.use(cors());

const userCtrl = require("./app/controller/user-ctrl");
const brandCtrl = require("./app/controller/brand-ctrl");
const categoryCtrl = require("./app/controller/category-ctrl");
const productCtrl = require("./app/controller/product-ctrl");
const grnCtrl = require("./app/controller/grn-Ctrl");
const reserveCtrl = require("./app/controller/reserve-ctrl");
const cartCtrl = require("./app/controller/cart-ctrl");
const invoiceCtrl = require("./app/controller/invoice-ctrl");
// const stripe = require("./app/controller/payment-ctrl");
const stripe = require("stripe")(process.env.STRIPE_KEY);

// const brainTreeToken = require("./app/controller/product-ctrl");
// const brainTreePayment = require("./app/controller/product-ctrl");

const { authenticateUser, authorizeUser } = require("./app/middlewares/auth");

const {
  userRegisterationSchema,
  userLoginSchema,
} = require("./app/validations/user-validation-schema");
const BrandValidationSchema = require("./app/validations/brand-validation");
const categorySchema = require("./app/validations/category-validation");
const productSchema = require("./app/validations/product-validation");
const grnValidationSchema = require("./app/validations/grn-validation");
const reserveValidation = require("./app/validations/reserve-validation");
const cartValidationSchema = require("./app/validations/cart-validation");

configureDB();

//user authentication API
app.post(
  "/api/users/register",
  checkSchema(userRegisterationSchema),
  userCtrl.register
);
app.post("/api/users/login", checkSchema(userLoginSchema), userCtrl.login);
app.get("/api/users/account", authenticateUser, userCtrl.account);

//user Apis
//user-[admin,employee]
app.post(
  "/api/user/register",
  checkSchema(userRegisterationSchema),
  userCtrl.register
); //need review
//app.get("/api/user/verify/:token", userCtrl.verify); //need review
app.post("/api/user/login", checkSchema(userLoginSchema), userCtrl.login);

//get all user
app.get("/api/list/users", userCtrl.list);

//setup private User route
app.get("/user-auth", authenticateUser, (req, res) => {
  res.status(200).send({ ok: true });
});

//setup private Adminnroute
app.get(
  "/employee-auth",
  authenticateUser,
  authorizeUser([roles.employee]),
  (req, res) => {
    return res.status(200).send({ ok: true });
  }
);

//Request Handlers for Brand -
app.get("/api/brands", brandCtrl.list);
app.post(
  "/api/brands",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam, roles.employee]),
  checkSchema(BrandValidationSchema),
  brandCtrl.create
);
app.put(
  "/api/brands/:id",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam]),
  checkSchema(BrandValidationSchema),
  brandCtrl.update
);
app.delete(
  "/api/brands/:id",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam]),
  brandCtrl.delete
);

//Request Handlers for Category
app.get("/api/category", categoryCtrl.list);
app.post(
  "/api/category",
  checkSchema(categorySchema),
  authenticateUser,
  authorizeUser([roles.Techology, roles.employee, roles.contentTeam]),
  categoryCtrl.create
);
app.put(
  "/api/category/:id",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam, roles.employee]),
  checkSchema(categorySchema),
  categoryCtrl.update
);
app.delete(
  "/api/category/:id",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam, roles.employee]),
  checkSchema(categorySchema),
  categoryCtrl.delete
);

//get Single category
app.get("/api/single/category/:id", categoryCtrl.single);

//Request Handler for Product
app.get("/api/products", productCtrl.list);

app.post(
  "/api/products",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam, roles.employee]),
  formidableMiddleware(),
  productCtrl.create
);

//fetch single product
app.get(
  "/api/products/:slug",
  authenticateUser,
  authorizeUser([roles.employee]),
  productCtrl.singleProduct
);

//get product Photo
app.get("/api/product-photo/:pid", productCtrl.productPhoto); //doubt

app.put(
  "/api/products/:pid",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam, roles.employee]),
  formidableMiddleware(),
  productCtrl.update
);
app.delete(
  "/api/products/:id",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam]),
  checkSchema(productSchema),
  productCtrl.delete
);

//filter products api
app.post("/api/product-filter", productCtrl.productFilter);
app.delete(
  "/api/products/softDelete/:id",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam]),
  checkSchema(productSchema),
  productCtrl.softDelete
);

//Create GRN API's
app.post(
  "/api/create/GRN",
  authenticateUser,
  authorizeUser([roles.Techology, roles.buying_and_Merchant, roles.employee]),
  checkSchema(grnValidationSchema),
  grnCtrl.create
);
app.get(
  "/api/list/GRN",
  authenticateUser,
  authorizeUser([roles.employee]),
  grnCtrl.list
);

//Reservation API's
app.get(
  "/api/list/reserveproducts",
  authenticateUser,
  authorizeUser([roles.employee]),
  reserveCtrl.list
);

app.post(
  "/api/create/product/reservation",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam, roles.employee]),
  checkSchema(reserveValidation),
  reserveCtrl.create
);
app.put(
  "/api/product/update/reserve/:id",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam, roles.employee]),
  reserveCtrl.update
);
app.delete(
  "/api/product/reserve/softDelete/:id",
  authenticateUser,
  authorizeUser([roles.Techology, roles.contentTeam, roles.employee]),
  checkSchema(reserveValidation),
  reserveCtrl.softDelete
); //ReserveStop Api
app.delete(
  "/api/product/resere/softDelete/ended/:id",
  authenticateUser,
  authorizeUser([roles.employee]),
  checkSchema(reserveValidation),
  reserveCtrl.ended
); //reserveEnded Api

app.put("/api/product/updatereserve/:productId", reserveCtrl.reserveQuantity);

//cart Route
app.get("/api/product/list/addToCart/:id", cartCtrl.getCartDetails);
app.post(
  "/api/product/addToCart",
  authenticateUser,
  authorizeUser([roles.retailer]),
  cartCtrl.addTocart
);

//Invoice API's
app.post("/api/order/invoice", invoiceCtrl.create);
app.delete("/api/order/deleteInvoice/:InvoiceId", invoiceCtrl.softDelete);

//payment APIs
// app.use("/api/stripe", stripe);

//payment gateway
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Initialize Express router
const router = express.Router();

// Create a checkout session endpoint
app.post("/create-checkout-session", async (req, res) => {
  try {
    const line_items = req.body.cart.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
            // Add other product data such as discount, mrp, etc. if needed
          },
          unit_amount: item.B2BPrice * 100, // Assuming each item has a 'B2BPrice' property representing the price in dollars
        },
        quantity: item.stock,
      };
    });
    console.log("body", line_items);

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Error creating checkout session");
  }
});

// Export the router
module.exports = router;

const PORT = process.env.PORT || 3055;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
