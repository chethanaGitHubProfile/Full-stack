import { useReducer, useEffect } from "react";
// import ProductForm from "./Product-form";
import productReducer, { ProductProvider } from "../reducers/Product-Reducer";
// import { useContext } from "react";
import { ProductContext } from "../contexts/root-context";
import axios from "axios";
// import { useEffect } from "react";
import Layout from "./Layout/Layout";
import ProductTable from "./Product-Table";
import EmployeeMenu from "./Layout/EmployeeMenu";
export default function ProductsConatiner() {
  const [products, productDispatch] = useReducer(productReducer, {
    data: [],
    serverErrors: [],
  });

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
    <ProductProvider>
      <Layout title={"Create product - Retalio App"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <EmployeeMenu />
            </div>
            <ProductContext.Provider value={{ products, productDispatch }}>
              <div className="col-md-9">
                <h2>Manage Products</h2>
                <h3>Total products-{products.data.length}</h3>
                <ProductTable />
              </div>
              {/* <div>
            {" "}
            <ProductForm />
          </div> */}
            </ProductContext.Provider>
          </div>
        </div>
      </Layout>
    </ProductProvider>
  );
}
