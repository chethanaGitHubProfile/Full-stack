import React from "react";
import Retailermenu from "../../Components/Layout/RetailerMenu";
import Layout from "../../Components/Layout/Layout";
export default function Profile() {
  return (
    <Layout title={"Your profile-retailo"}>
      <div className="conatiner-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Retailermenu />
          </div>
          <div className="col-md-9">
            <h1>Your profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
