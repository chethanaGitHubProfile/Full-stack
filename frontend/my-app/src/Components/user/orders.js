import React from "react";
import Retailermenu from "../../Components/Layout/RetailerMenu";
import Layout from "../../Components/Layout/Layout";
export default function Orders() {
  return (
    <Layout title={"your orders-Retailo"}>
      <div className="conatiner-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Retailermenu />
          </div>
          <div className="col-md-9">
            <h1>All orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
