import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
export default function CategoryForm({ onSuccess, initialValue }) {
  const [form, setForm] = useState({ name: initialValue });
  const [errors, setErrors] = useState({
    name: false,
  });

  const [token, setToken] = useState("");

  // Add this useEffect hook to log the token when it changes
  useEffect(() => {
    //function to eftch token
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3055/api/user/login",
          {
            email: "chethana@gmail.com",
            password: "secret123",
          }
        );

        //extract token from response
        const authToken = response.data.token;
        setToken(authToken);
      } catch (error) {
        console.log(error);
      }
    };
    fetchToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateErrors = {
      name: form.name === "",
    };
    //client validation
    if (form.name === "") {
      updateErrors.name = true;
    } else {
      updateErrors.name = false;
    }
    setErrors(updateErrors);

    if (!updateErrors.name) {
      if (!token) {
        console.error("Token is required");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:3055/api/category",
          form,
          {
            headers: {
              AuthoriZation: token,
            },
          }
        );
        if (response?.data?.success) {
          toast.success(`${form.name} is created successfully`);
        }
        console.log(response.data);
        setForm({ name: "" });

        onSuccess();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in input field");
        setErrors("An error in creating category");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <h4>Add Category</h4>
        <div>
          <label>category Name</label>
          <input
            type="text"
            // value={form.name}
            value={initialValue}
            onChange={handleChange}
            name="name"
            id="name"
            className="form-control"
          />
          {errors.name && (
            <span className="text-danger">category name is required</span>
          )}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        submit
      </button>
    </form>
  );
}
