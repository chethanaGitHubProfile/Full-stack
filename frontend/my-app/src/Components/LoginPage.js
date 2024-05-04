import { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import toast from "react-hot-toast"; // Import toast module
// import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export default function LoginPage() {
  // const dispatch = useDispatch();
  const navigate = useNavigate(); //initialize useHostory Hook
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    role: { required: false },
  };
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updateErrors = { ...errors };
    let hasError = false;
    //validating form field
    if (inputs.email === "") {
      updateErrors.email.required = true;
      hasError = true;
    }
    if (inputs.password === "") {
      updateErrors.password.required = true;
      hasError = false;
    }
    if (!hasError) {
      setIsLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:3055/api/user/login",
          {
            email: inputs.email,
            password: inputs.password,
          }
        );
        console.log("login", response.data);
        if (response.data) {
          toast.success(response.data && response.data.message);
          setAuth({
            ...auth,
            tokenData: response.data.tokenData,
            token: response.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(response.data));
          toast.success("Logout Successfully");
          navigate(location.state || "/");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setErrors(updateErrors);
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div>
      <section className="login-block">
        <div className="container">
          <div className="row ">
            <div className="col login-sec">
              <h2 className="text-center">Login Now</h2>
              <form onSubmit={handleSubmit} className="login-form" action="">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={handleInputs}
                    className="form-control"
                    name="email"
                    id="emailInput"
                    placeholder="email"
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
                    onChange={handleInputs}
                    type="password"
                    name="password"
                    placeholder="password"
                    id=""
                  />
                  {errors.password.required ? (
                    <span className="text-danger">Password is required.</span>
                  ) : null}
                </div>

                <div className="form-group">
                  <div className="text-center">
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
                  </div>
                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    disabled={loading}
                    value="Login"
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Create new account ? Please{" "}
                  <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
