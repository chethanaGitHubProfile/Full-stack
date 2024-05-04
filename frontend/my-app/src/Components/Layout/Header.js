import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import "../.././index.css";
import { PiShoppingCartBold } from "react-icons/pi";
import { useCart } from "../../contexts/cart";
import { Badge } from "antd";
const Header = () => {
  const [auth, setAuth] = useAuth();

  const [cart] = useCart();
  console.log("header", cart);
  const handleLogout = () => {
    setAuth({
      tokenData: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  console.log("Cart Length:", cart.length);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand">
          <PiShoppingCartBold /> RETALIO
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" actievclassname="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/category"
                className="nav-link"
                actievclassname="active"
              >
                Category
              </NavLink>
            </li>
            {!auth.tokenData ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    actievclassname="active"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    actievclassname="active"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    to="/dashboard"
                    className="nav-link dropdown-toggle"
                    actievclassname="active"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.tokenData.role}
                  </NavLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.tokenData?.role === "employee"
                            ? "employee"
                            : "retailer"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-item">
              <Badge count={cart?.length} showZero>
                <NavLink
                  to="/retailer/listproducts/cart"
                  className="nav-link"
                  actievclassname="active"
                >
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
