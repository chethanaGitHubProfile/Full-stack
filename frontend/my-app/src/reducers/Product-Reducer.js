// const initialState = {
//   data: [],
//   serverErrors: [],
// };
// // console.log("InitialState", initialState);
// const productsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_PRODUCTS": {
//       return { ...state, data: action.payload };
//     }
//     case "ADD_PRODUCTS": {
//       return { ...state, data: [...state.data, action.payload] };
//     }
//     case "SET_ERRORS": {
//       return { ...state, serverErrors: action.payload };
//     }
//     default: {
//       return { ...state };
//     }
//   }
// };

// export default productsReducer;
import { useContext, useReducer } from "react";
import { ProductContext } from "../contexts/root-context";
const initialState = {
  product: [],
  serverErrors: [],
};

export default function productReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCT": {
      return { ...state, data: action.payload };
    }
    case "CREATE_PRODUCT": {
      return { ...state, product: action.payload };
    }
    default: {
      return { ...state };
    }
  }
}

//context provider component
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

//custom hook to use the context
export const useProductContext = () => {
  return useContext(ProductContext);
};
