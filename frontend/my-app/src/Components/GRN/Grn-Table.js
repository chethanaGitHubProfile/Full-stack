import Layout from "../Layout/Layout";
import React from "react";
import EmployeeMenu from "../Layout/EmployeeMenu";
import { GRNContext } from "../../contexts/root-context";
import { useContext } from "react";
export default function GRNTable() {
  const { grn } = useContext(GRNContext);
  let serialNumber = 0;
  return (
    <div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>GRNId</th>
              <th>totalQuantity</th>
              <th>totalPurchasePrice</th>
            </tr>
          </thead>
          <tbody>
            {grn.data.map((ele) => {
              serialNumber++;
              const grnId = `GRN${serialNumber.toString().padStart(2, "0")}`;
              return (
                <tr key={grnId}>
                  <td>{serialNumber}</td>
                  <td>{grnId}</td>
                  <td>{ele.totalQuantity}</td>
                  <td>{ele.totalPurchasePrice}</td>
                  <td>
                    <button className="btn btn-primary ms-2">Show</button>
                    <button className="btn btn-primary ms-2">edit</button>
                    <button className="btn btn-danger ms-2">remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
