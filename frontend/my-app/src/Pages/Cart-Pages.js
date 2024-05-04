import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/Auth";
import { useCart } from "../contexts/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import PayButton from "../Components/Payments/PayButton";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.B2BPrice;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:3055/api/braintree/token"
  //     );
  //     setClientToken(data?.clientToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getToken();
  // }, [auth?.tokenData]);

  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMenthod();
  //     const { data } = await axios.post(
  //       "http://localhost:3055/api/braintree/payment",
  //       { nonce, cart }
  //     );
  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/retailer/orders");
  //     toast.success("Payment compeleted successfully");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 md-1">{`Hello ${
              auth?.tokenData && auth?.tokenData?.email
            }`}</h1>
            <div className="col-md-9">Cart Item</div>
            <h4>
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth.tokenData ? "" : "Please login to checkout"
                  }`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`http://localhost:3055/api/product-photo/${p._id}`}
                    className="card-img-top product-image"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>price :₹ {p.B2BPrice}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            <div>
              <button>
                <p>
                  {auth?.tokenData?.email ? <PayButton cart={cart} /> : null}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CartPage;
