import { NavLink } from "react-router-dom";
export default function Retailermenu() {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h2>Dashboard</h2>
          <NavLink
            to="/dashboard/retailer/profile"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            Retailer Profile
          </NavLink>
          <NavLink
            to="/dashboard/retailer/orders"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            orders
          </NavLink>
          <NavLink
            to="/dashboard/retailer/listproducts"
            className="list-group-item"
            list-group-item-action
            active
            aria-current="true"
          >
            List Products
          </NavLink>
        </div>
      </div>
    </>
  );
}
