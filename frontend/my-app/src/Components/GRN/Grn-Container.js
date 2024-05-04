import React, { useEffect } from "react";
// import GRNForm from "./GRN-Form";
import GRNTable from "./Grn-Table";
import EmployeeMenu from "../Layout/EmployeeMenu";
import Layout from "../Layout/Layout";
import { useReducer } from "react";
import grnReducer, { GrnProvider } from "../../reducers/Grn-Reducer";
import { useContext } from "react";
import axios from "axios";
import { GRNContext } from "../../contexts/root-context";
export default function GRNContainer() {
  const [grn, grnDispatch] = useReducer(grnReducer, {
    data: [],
    serverErrors: [],
  });

  //fetch GRN
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:3055/api/list/GRN");
        console.log(response.data);
        grnDispatch({ type: "SET_GRN", payload: response.data });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <GrnProvider>
      <Layout title={"List GRN - Retalio App"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <EmployeeMenu />
            </div>
            <GRNContext.Provider value={{ grn, grnDispatch }}>
              <div className="col-md-9">
                <h2>GRN Conatiner</h2>
                <h3>Total OnBoarded product -{grn.data.length}</h3>
                <GRNTable />
              </div>
            </GRNContext.Provider>
          </div>
        </div>
      </Layout>
    </GrnProvider>
  );
}
