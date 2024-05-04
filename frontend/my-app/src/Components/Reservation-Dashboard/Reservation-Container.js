import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import ReservationForm from "./Reservation-Form";
import ReservationTable from "./Reservation-Table";
import EmployeeMenu from "../Layout/EmployeeMenu";
import { useReducer } from "react";
import reserveReducer, {
  ReserveProvider,
} from "../../reducers/Reserve-Reducer";
import { useContext } from "react";
import { ReserveContext } from "../../contexts/root-context";
export default function ReservationContainer() {
  const [reserve, reserveDispatch] = useReducer(reserveReducer, {
    data: [],
    serverErrors: [],
  });

  //fetch Reserve data
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:3055/api/list/reserveproducts"
        );
        console.log("res", response.data);
        reserveDispatch({ type: "SET_RESERVE", payload: response.data });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <ReserveProvider>
      <Layout title={"List reserve - Retalio App"}>
        <div className="conatiner-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <EmployeeMenu />
            </div>
            <ReserveContext.Provider value={{ reserve, reserveDispatch }}>
              <div className="col-md-9">
                <h2>Reserve Conatiner</h2>
                <h3>Total Reserve - {reserve.data.length}</h3>
                <ReservationTable />
              </div>
            </ReserveContext.Provider>
          </div>
        </div>
      </Layout>
    </ReserveProvider>
  );
}
