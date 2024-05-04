import React from "react";
import Layout from "../Components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { useAuth } from "../contexts/Auth";
import { B2BPrice } from "../Components/Prices";
import { useCart } from "../contexts/cart";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategoires] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  useEffect(() => {
    getAllcategoires();
    getAllProducts();
  }, []);

  //fetch all categories
  const getAllcategoires = async () => {
    try {
      const response = await axios.get("http://localhost:3055/api/category");
      setCategoires(response.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //fetch all products
  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3055/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((cat) => cat !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  //filtered products
  const filterProducts = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3055/api/product-filter",
        { checked, radio }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add to cart function with out of stock validation
  const addToCart = (product) => {
    if (product.stock <= 0) {
      toast.error("Out of Stock");
    } else {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      toast.success("Item Added to cart");
    }
  };

  return (
    <Layout title={"shop now - Retalio App"}>
      <div className="row mt-3">
        {/* Filter section */}
        <div className="col-md-3">
          <h4 className="text-center">Filter by category</h4>
          <div className="d-flex flex-column">
            {categories?.map((cat) => (
              <Checkbox
                key={cat._id}
                onChange={(e) => handleFilter(e.target.checked, cat._id)}
              >
                {cat.name}
              </Checkbox>
            ))}
          </div>
          {/* Price filter */}
          <h4 className="text-center mt-4">Filter by Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {B2BPrice?.map((prod) => (
                <div key={prod._id}>
                  <Radio value={prod.array}>{prod.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>

        {/* Products section */}
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "12rem" }} key={p._id}>
                <img
                  src={`http://localhost:3055/api/product-photo/${p._id}`}
                  className="card-img-top product-image"
                  alt={p.name}
                  style={{ maxWidth: "100%", maxHeight: "200px" }} // Adjust the image size
                />
                <div className="card-body">
                  <p
                    className="card-text"
                    style={{ color: "navy", fontWeight: "bold" }}
                  >
                    ₹{p.mrp}
                    <span
                      style={{
                        fontSize: "80%",
                        color: "black",
                        fontWeight: "normal",
                        size: 2,
                      }}
                    >
                      MRP
                    </span>
                  </p>
                  <h5
                    className="card-title"
                    style={{ fontSize: "1rem", fontWeight: "bold" }}
                  >
                    {p.name}
                  </h5>
                  <p className="card-text" style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "bold", color: "grey" }}>
                      category:
                    </span>
                    {p.category}
                  </p>
                  <p className="card-text" style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "bold", color: "grey" }}>
                      discount:
                    </span>
                    {p.discount}%
                  </p>
                  <p className="card-text" style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "bold", color: "grey" }}>
                      sellingprice:
                    </span>
                    ₹ {p.B2BPrice}
                  </p>
                  <p className="card-text" style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "bold", color: "grey" }}>
                      stock:
                    </span>
                    {p.stock <= 0 ? "Out of Stock" : p.stock}
                  </p>
                  {p.stock > 0 && (
                    <button
                      className="btn btn-primary dtn-sm d-block mx-auto"
                      onClick={() => addToCart(p)}
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
