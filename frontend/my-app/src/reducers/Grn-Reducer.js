import { useContext, useReducer } from "react";
import { GRNContext } from "../contexts/root-context";

const initialState = {
  grn: [],
  serverErrors: [],
};

export default function grnReducer(state, action) {
  switch (action.type) {
    case "SET_GRN": {
      return { ...state, data: action.payload };
    }
    case "CREATE_GRN": {
      return { ...state, grn: action.payload };
    }
    default: {
      return { ...state };
    }
  }
}

//Context provider component
export const GrnProvider = ({ children }) => {
  const [state, dispatch] = useReducer(grnReducer, initialState);

  return (
    <GRNContext.Provider value={{ state, dispatch }}>
      {children}
    </GRNContext.Provider>
  );
};

//custom hook to use the context
export const useGrnContext = () => {
  return useContext(GRNContext);
};
