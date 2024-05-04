import "../Styles/RetailerPage.css";
import { RetailerContext } from "../contexts/root-context";
import { useContext } from "react";
import RetailerTable from "./RetailerTable";
import RetailerForm from "./RetailerForm";

export default function RetailerContainer() {
  const { retailer } = useContext(RetailerContext);
  return (
    <div>
      <section className="login-block">
        <div className="container">
          <div className="row "></div>
          <h2>Total Users -{retailer.data.length}</h2>
        </div>
        <div className="col-md-8">
          <RetailerTable retailer={retailer} />
        </div>
        <div className="col-md-4">
          <RetailerForm />
        </div>
      </section>
    </div>
  );
}
