import React, { useReducer } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import categoryReducer from "../../reducers/Category-reducer";
import CategoryTable from "./Create-categoryTable";
import CategoryForm from "./Category-Form";
import Layout from "../Layout/Layout";
const CategoryContainer = () => {
  const [category, categoryDispatch] = useReducer(categoryReducer, {
    data: [],
    serverErrors: [],
  });

  const [showForm, setShowForm] = useState(false); // state to control form visibility

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3055/api/category");
      console.log("cat", response.data);
      categoryDispatch({ type: "SET_CATEGORY", payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  //Function to toggle the visiblity of the modal
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  //callback function to close the form after submission
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchData();
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div style={{ textAlign: "left" }}>
          <button onClick={toggleForm}> Add Category</button>
          {showForm && <CategoryForm onSuccess={handleFormSuccess} />}
        </div>
        <div>
          <CategoryTable category={category} setShowForm={setShowForm} />
        </div>
      </div>
    </Layout>
  );
};
export default CategoryContainer;
