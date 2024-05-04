import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import BootstrapSpinner from "react-bootstrap/Spinner";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  //it will redirect to where we left the page ex - user did not login and clicked dashboard page .
  //it will go for login page once login is done it should come for same dashboard page so we used useLocation
  //   const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/${path}`, { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate.location, path]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <h1 className="text-center">redirecting to you in {count} seconds</h1>
        <Button variant="primary" disabled>
          <BootstrapSpinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </Button>{" "}
        <Button variant="primary" disabled>
          <BootstrapSpinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    </>
  );
};

export default Spinner;
