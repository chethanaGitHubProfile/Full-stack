import React from "react";
import Layout from "../../Components/Layout/Layout";
import EmployeeMenu from "../../Components/Layout/EmployeeMenu";
import { useAuth } from "../../contexts/Auth";
export default function EmployeeDashoard() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Dashboard-Retalio App"}>
      <h3>Employee Dashboard</h3>
      <div className="conatiner-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <EmployeeMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>{auth?.tokenData?.role}</h1>
              <h1>{auth?.tokenData?.email}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
