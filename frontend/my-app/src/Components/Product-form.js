import React, { useEffect, useState, useReducer } from "react";
import Layout from "./Layout/Layout";
import EmployeeMenu from "./Layout/EmployeeMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import productReducer from "../reducers/Product-Reducer";
export default function ProductForm() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [mrp, setMrp] = useState("");
  const [discount, setDiscount] = useState("");
  const [B2BPrice, setB2BPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [products, productDispatch] = useReducer(productReducer, {
    data: [],
    serverErrors: [],
  });

  useEffect(() => {
    //Calculate B2Bprice
    if (mrp && discount) {
      //parse value to number
      const mrpValue = parseFloat(mrp);
      const discountvalue = parseFloat(discount);
      const B2BPricevalue = Math.abs(
        (discountvalue / 100) * mrpValue - mrpValue
      );
      setB2BPrice(B2BPricevalue);
    }
    fetchCategories();
  }, [mrp, discount]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3055/api/category");
      console.log("catgeories", response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  //create Product
  const handleCreate = async (e) => {
    e.preventDefault();

    //client side validation

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("mrp", mrp);
      productData.append("discount", discount);
      productData.append("category", category);
      productData.append("photo", photo);
      productData.append("B2BPrice", B2BPrice);

      const response = await axios.post(
        "http://localhost:3055/api/products",
        productData
      );
      if (response.data) {
        toast.success("Product Created Successfully");
        fetchData();
        navigate("/dashboard/employee/list-product");
      } else {
        toast.error(response.data?.message);
      }
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating product");
    }
  };

  //to upadate products
  useEffect(() => {
    fetchData();
  }, []);

  //List products-
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3055/api/products");
      console.log("products", response.data);
      productDispatch({ type: "SET_PRODUCT", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Create product-retalio App"}>
      <div className="conatiner fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <EmployeeMenu />
          </div>
          <div className="col-md-9">
            <h1>Create product</h1>
            <div>
              {/* {console.log("c", categories)} */}
              <select
                className="form-select mb-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Catgeory</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="md-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <div className="md-3">
                <input
                  type="text"
                  value={mrp}
                  placeholder="Enter product mrp"
                  className="form-control"
                  onChange={(e) => setMrp(e.target.value)}
                />
              </div>
              <br />
              <div className="md-3">
                <input
                  type="text"
                  value={discount}
                  placeholder="Enter product discount"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <br />
              <div>
                <input
                  type="text"
                  value={B2BPrice}
                  placeholder="B2BPrice"
                  className="form-control"
                  onChange={(e) => setB2BPrice(e.target.value)}
                  disabled
                />
              </div>{" "}
              <br />
              <div className="mb-3">
                <select
                  bordered={false}
                  value={shipping}
                  placeholder="Select Shipping"
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <br />
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
