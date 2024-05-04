import "../Styles/RetailerPage.css";
//import { v4 as uuidv4 } from "uuid";
export default function RetailerTable(props) {
  const { retailer } = props;
  let serialNumber = 0;
  return (
    <div>
      <h2>Manage Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>UserId</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {retailer.data.map((ele) => {
            serialNumber++; //increment serial number for each row
            const UserId = `UserId${serialNumber.toString().padStart(2, "0")}`; //generate objectId for the retailer
            return (
              <tr key={UserId}>
                <td>{serialNumber}</td>
                <td>{UserId}</td>
                <td>{ele.username}</td>
                <td>{ele.email}</td>
                <td>{ele.role}</td>
                <td>
                  <button>View Details</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
