/*import { useState } from "react";
import "./RegisterPage.css";
//import bcrypt from "bcryptjs";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import Layout from "./Layout/Layout";
export default function Registerpage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const initialStateErrors = {
    username: { required: false },
    email: { required: false },
    password: { required: false },
    role: { required: false },
  };
  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updateErrors = { ...errors };
    let hasError = false;

    //  validating form field
    if (username === "") {
      updateErrors.username.required = true;
      hasError = true;
    }
    if (email === "") {
      updateErrors.email.required = true;
      hasError = true;
    }

    if (password === "") {
      updateErrors.password.required = true;
      hasError = true;
    }
    if (role === "") {
      updateErrors.role.required = true;
      hasError = true;
    }
    if (!hasError) {
      setLoading(true);
    }

    try {
      const response = await axios.post(
        "http://localhost:3055/api/user/register",
        { username, email, password, role }
      );
      console.log(response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.log("Registration falied", error);
    } finally {
      setLoading(false);
    }
    setErrors({ ...errors });
  };

  return (
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Welcome to Retalio</h2>
            <p>
              Retalio is a platform where both retailers and customers come
              together to buy or sell and stay connected to fulfil their needs
            </p>
            {registrationSuccess && (
              <div className="alert alert-success">
                User registered successfully!
                <div>
                  <a href="#;" className="btn btn-primary">
                    Login
                  </a>
                </div>
              </div>
            )}

            {!hideForm && ( // Render the form only if hideForm is false
              <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    username
                  </label>

                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    name="username"
                    id=""
                    placeholder="Enter username"
                  />
                  {errors.username.required ? (
                    <span className="text-danger">Name is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    name="email"
                    id=""
                    placeholder="Enter Email"
                  />
                  {errors.email.required ? (
                    <span className="text-danger">Email is required.</span>
                  ) : null}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="text-uppercase"
                  >
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id=""
                    placeholder="password"
                  />
                  {errors.password.required ? (
                    <span className="text-danger">Password is required.</span>
                  ) : null}
                </div>
                <div>
                  <span>Please select a role</span>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      Admin
                    </label>
                    <label style={{ marginLeft: "10px" }}>
                      <input
                        type="radio"
                        name="role"
                        value="employee"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      Employee
                    </label>
                    <label style={{ marginLeft: "10px" }}>
                      <input
                        type="radio"
                        name="role"
                        value="retailer"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      Retailer
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <span className="text-danger"></span>
                  {loading ? (
                    <div className="text-center">
                      <div
                        className="spinner-border text-primary "
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    disabled={loading}
                    value="Register"
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Already have an account?Please
                  <Link to="/login">Login</Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}*/

import { useState } from "react";
import "./RegisterPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Registerpage() {
  const navigate = useNavigate();
  const initialStateErrors = {
    username: { required: false },
    email: { required: false },
    password: { required: false },
    role: { required: false },
    custom_error: null,
  };
  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [serverErrors, setServerErrors] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [hideForm, setHideForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updateErrors = { ...errors };
    let hasError = false;

    //validating form field
    if (inputs.username === "") {
      updateErrors.username.required = true;
      hasError = true;
    }
    if (inputs.email === "") {
      updateErrors.email.required = true;
      hasError = true;
    }

    if (inputs.password === "") {
      updateErrors.password.required = true;
      hasError = true;
    }
    if (inputs.role === "") {
      updateErrors.role.required = true;
      hasError = true;
    }
    console.log(inputs);
    if (!hasError) {
      setLoading(true);

      //set createdAt field before sending data to the server
      const dataToSend = {
        ...inputs,
        createdAt: new Date().toISOString(), //set current date and time
      };

      //sending register API request
      try {
        const response = await axios.post(
          "http://localhost:3055/api/user/register",
          dataToSend,
          {
            username: inputs.username,
            email: inputs.email,
            password: inputs.password,
            role: inputs.role,
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        }

        //localStorage
        localStorage.setItem("user", JSON.stringify(inputs));
        navigate("/login");
        //storeUserData(response.data.idToken);
        console.log("Registeration successful", response.data);
        setRegistrationSuccess(true);
        setHideForm(true);
      } catch (err) {
        console.log("Registration falied", err);
        setServerErrors(err.response.data.errors);
      } finally {
        setLoading(false);
      }
    }
    setErrors({ ...errors });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

    //when user start typing error message should be cleared
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: { required: false },
    }));
  };

  /* if (isAuthenticated()) {
    //redirect user to dashboard
    return <Navigate to="/dashboard" />;
  }*/

  return (
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Welcome to Retalio</h2>
            <p>
              Retalio is a platform where both retailers and customers come
              together to buy or sell and stay connected to fulfil their needs
            </p>
            {registrationSuccess && serverErrors.length === 0 && (
              <div className="alert alert-success">
                User registered successfully!
                <div>
                  <a href="#;" className="btn btn-primary">
                    Login
                  </a>
                </div>
              </div>
            )}

            {!hideForm && ( // Render the form only if hideForm is false
              <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    username
                  </label>

                  <input
                    type="text"
                    onChange={handleInput}
                    className="form-control"
                    name="username"
                    id=""
                    placeholder="Enter username"
                  />
                  {errors.username.required ? (
                    <span className="text-danger">Name is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    onChange={handleInput}
                    className="form-control"
                    name="email"
                    id=""
                    placeholder="Enter Email"
                  />
                  {errors.email.required ? (
                    <span className="text-danger">Email is required.</span>
                  ) : null}
                </div>

                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="text-uppercase"
                  >
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    onChange={handleInput}
                    name="password"
                    id=""
                    placeholder="password"
                  />
                  {errors.password.required ? (
                    <span className="text-danger">Password is required.</span>
                  ) : null}
                </div>
                <div>
                  <span>Please select a role</span>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        onChange={handleInput}
                      />
                      Admin
                    </label>
                    <label style={{ marginLeft: "10px" }}>
                      <input
                        type="radio"
                        name="role"
                        value="employee"
                        onChange={handleInput}
                      />
                      Employee
                    </label>
                    <label style={{ marginLeft: "10px" }}>
                      <input
                        type="radio"
                        name="role"
                        value="retailer"
                        onChange={handleInput}
                      />
                      Retailer
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <span className="text-danger"></span>
                  {loading ? (
                    <div className="text-center">
                      <div
                        className="spinner-border text-primary "
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    disabled={loading}
                    value="Register"
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Already have an account?Please
                  <Link to="/login">Login</Link>
                </div>
              </form>
            )}
            {serverErrors.length > 0 && (
              <div>
                <ul>
                  {serverErrors.map((ele, i) => {
                    return (
                      <li key={i} className="text-danger">
                        {ele.msg}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
