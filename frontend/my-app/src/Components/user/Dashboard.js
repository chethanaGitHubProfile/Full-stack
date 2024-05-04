import React from "react";
import Layout from "../Layout/Layout";
import Retailermenu from "../Layout/RetailerMenu";
import { useAuth } from "../../contexts/Auth";

export default function UserDashboard() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Dashboard - Retalio App"}>
      <div className="conatiner-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-4">
            <Retailermenu />
          </div>
          <div className="col-md-8">
            <div card w-75 p-3>
              <h3>{auth?.tokenData?.role}</h3>
              <h3>{auth?.tokenData?.name}</h3>
              <h3>{auth?.tokenData?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
