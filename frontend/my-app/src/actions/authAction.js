import axios from "axios";
export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3055/api/user/login",
        credentials
      );
      const token = response.data.token;
      console.log("logged in token", token);

      //store the token in localStorage
      localStorage.setItem("token", token);

      //Dispatch an action to indicate successful login
      dispatch({ type: "LOGIN_SUCCESS", token });
    } catch (error) {
      console.log(error);
      //dispatch an action to handle login failure
      dispatch({ type: "LOGIN_ERROR", error: error.message });
    }
  };
};
