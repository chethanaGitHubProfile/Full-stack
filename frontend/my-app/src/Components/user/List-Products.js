import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Retailermenu from "../../Components/Layout/RetailerMenu";
import Layout from "../../Components/Layout/Layout";
import "./Listing-page.css";
export default function ListProducts() {
  const [products, setProducts] = useState([]);

  //fetch all product
  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3055/api/products");
      console.log("products", response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Your profile-retailo"}>
      <div className="conatiner-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Retailermenu />
          </div>
          <div className="col-md-9">
            <h1>Listing Products</h1>

            <div className="d-flex">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`http://localhost:3055/api/product-photo/${p._id}`}
                    className="card-img-top product-image"
                    alt={p.name}
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
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
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
                        Photo
                      </span>
                      {p.photo}
                    </p>
                    <p className="card-text" style={{ marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: "bold", color: "grey" }}>
                        sellingprice:
                      </span>
                      {p.B2BPrice}
                    </p>
                    <p className="card-text" style={{ marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: "bold", color: "grey" }}>
                        stock:
                      </span>
                      {p.stock}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
