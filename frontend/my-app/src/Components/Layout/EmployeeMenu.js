import { NavLink } from "react-router-dom";
export default function EmployeeMenu() {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h2>Employee Panel</h2>
          <NavLink
            to="/dashboard/employee/create-category"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            Manage Category
          </NavLink>
          <NavLink
            to="/dashboard/employee/create-product"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/employee/list-product"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            List Product
          </NavLink>
          <NavLink
            to="/dashboard/retailer/users"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            List Users
          </NavLink>
          <NavLink
            to="/dashboard/employee/list-grn"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            List GRN
          </NavLink>
          <NavLink
            to="/dashboard/employee/create-grn"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            Create GRN
          </NavLink>
          <NavLink
            to="/dashboard/employee/create-reserve"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            Create Reservation
          </NavLink>
          <NavLink
            to="/dashboard/employee/list-reserve"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            List Reserve
          </NavLink>
        </div>
      </div>
    </>
  );
}
