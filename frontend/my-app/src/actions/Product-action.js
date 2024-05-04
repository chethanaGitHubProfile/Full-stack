import axios from "axios";
import { FETCH_PRODUCT_SUCCESS } from "./CartActionTypes";
export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get("localhost:3055/api/products");
    console.log("p", response.data);
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
