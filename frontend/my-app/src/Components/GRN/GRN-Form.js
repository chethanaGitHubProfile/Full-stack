import React, { useEffect, useReducer, useState } from "react";
import EmployeeMenu from "../Layout/EmployeeMenu";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import grnReducer from "../../reducers/Grn-Reducer";
import { updateStockQuantity } from "../Product-Table";
// import { useContext } from "react";
// import GRNContainer from "./Grn-Container";
// import { GRNContext } from "../../contexts/root-context";
// import { useGrnContext } from "../../contexts/root-context";
import { Select, Button } from "antd";
const { Option } = Select;
export default function GRNForm() {
  const [grn, grnDispatch] = useReducer(grnReducer, {
    data: [],
    serverErrors: [],
  });

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  // const [selectedproducts, setSelectedproducts] = useState([]);
  const [mrp, setMrp] = useState("");
  const [margin, setMargin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchase_price, setpurchase_price] = useState(0);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3055/api/products");
      if (response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting product");
    }
  };

  //fetch products to search and add
  useEffect(() => {
    //calculate purchase_price
    const mrpValue = parseFloat(mrp);
    const marginValue = parseFloat(margin);
    const quantityValue = parseInt(quantity);
    if (isNaN(mrpValue) || isNaN(marginValue) || isNaN(quantityValue)) {
      setpurchase_price(0);
    } else {
      // Calculate purchase_price only if all inputs are valid numbers
      const purchase_priceValue =
        Math.abs((marginValue / 100) * mrpValue - mrpValue) * quantityValue;
      setpurchase_price(purchase_priceValue.toFixed(2)); // Fixed to 2 decimal places
    }
    fetchProducts();
  }, [mrp, margin, quantity]);

  //create GRN
  const handleCreate = async (e) => {
    e.preventDefault();
    const selectedProduct = products.find((prod) => prod.name === product);
    if (!selectedProduct) {
      toast.error("please select the product");
      return;
    }
    const productObj = {
      productId: selectedProduct._id,
      name: product,
      mrp: parseFloat(mrp),
      margin: parseFloat(margin),
      quantity: parseInt(quantity),
    };
    try {
      const response = await axios.post(
        "http://localhost:3055/api/create/GRN",
        { products: [productObj], purchase_price: parseFloat(purchase_price) }
      );
      console.log(response.data);
      const newStockQuantity = selectedProduct.quantity + parseInt(quantity);
      updateStockQuantity(selectedProduct._id, newStockQuantity);
      grnDispatch({
        type: "CREATE_GRN",
        payload: response.data,
      });
      navigate("/dashboard/employee/list-grn");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating GRN");
    }
  };
  return (
    <Layout title={"Create GRN - Retalio App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <EmployeeMenu />
          </div>
          <div className="col-md-9">
            <h2>Onboard Products</h2>
            <div className="col-md-9">
              <label className="col-md-9">Select product</label>
              <Select
                variant={false}
                placeholder="select Product"
                size="large"
                showSearch
                className="form-select m-3"
                onChange={(value) => {
                  setProduct(value);
                }}
              >
                {products?.map((cat) => (
                  <Option key={cat._id} value={cat.name}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-md-9">
              <div className="col-md-9">
                <label>Enter Product mrp *</label>
                <input
                  type="text"
                  value={mrp}
                  placeholder="Enter product mrp"
                  size="larger"
                  className="form-control"
                  onChange={(e) => setMrp(e.target.value)}
                />
              </div>{" "}
              <br />
            </div>
            <div className="col-md-9">
              <div className="col-md-9">
                <label>Enter product margin</label>
                <input
                  type="text"
                  value={margin}
                  placeholder="Enter product margin"
                  size="larger"
                  className="form-control"
                  onChange={(e) => setMargin(e.target.value)}
                />
              </div>{" "}
              <br />
            </div>
            <div className="col-md-9">
              <div className="col-md-9">
                <label>Enter product quantity</label>
                <input
                  type="text"
                  value={quantity}
                  placeholder="Enter product quantity"
                  size="larger"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>{" "}
              <br />
            </div>
            <div className="col-md-9">
              <div className="col-md-9">
                <label>purchase_price</label>
                <input
                  type="text"
                  value={purchase_price}
                  placeholder="purchase_price"
                  size="larger"
                  className="form-control"
                  onChange={(e) => setpurchase_price(e.target.value)}
                  disabled
                />
              </div>{" "}
              <br />
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE GRN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
