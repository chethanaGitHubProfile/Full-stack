import React from "react";
import { ReserveContext } from "../../contexts/root-context";
import { useContext } from "react";
export default function ReservationTable() {
  const { reserve, products } = useContext(ReserveContext);
  let serialNumber = 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    if (status === "Pending") {
      return "badge bg-warning text-dark"; //yellow
    } else if (status === "Started") {
      return "badge bg-success";
    } else if (status === "Stopped") {
      return "badge bg-info";
    } else if (status === "Ended") {
      return "badge bg-danger";
    }
  };
  return (
    <div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>reserve Id</th>
              <th>Product Name</th>
              <th>reserve Quantity</th>
              <th>start Date</th>
              <th>end Date</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {reserve.data.map((ele) => {
              serialNumber++;
              const reserveId = `R${serialNumber.toString().padStart(2, "0")}`;
              return (
                <tr key={ele.id}>
                  <td>{serialNumber}</td>
                  <td>{reserveId}</td>
                  <td>{ele.productId}</td>
                  <td>{ele.reserveQuantity}</td>
                  <td>{formatDate(ele.startDate)}</td>
                  <td>{formatDate(ele.endDate)}</td>
                  <td className={getStatusColor(ele.status)}>{ele.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
