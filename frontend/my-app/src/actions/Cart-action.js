import axios from "axios";
// import { ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE } from "./CartActionTypes";

export const startGetCart = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3055/api/product/list/addToCart/${id}`
      );
      console.log("get cart", response.data);
      dispatch(setCart(response.data));
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
};

const setCart = (data) => {
  return { type: "SET_CART", payload: data };
};
