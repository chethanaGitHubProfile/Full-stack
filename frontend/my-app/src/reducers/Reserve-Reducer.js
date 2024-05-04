import { useContext, useReducer } from "react";
import { ReserveContext } from "../contexts/root-context";
const initialState = {
  reserve: [],
  serverErrors: [],
};

export default function reserveReducer(state, action) {
  switch (action.type) {
    case "SET_RESERVE": {
      return { ...state, data: action.payload };
    }
    case "CREATE_RESERVE": {
      return { ...state, reserve: action.payload };
    }
    default: {
      return { ...state };
    }
  }
}

//context provider component
export const ReserveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reserveReducer, initialState);
  return (
    <ReserveContext.Provider value={{ state, dispatch }}>
      {children}
    </ReserveContext.Provider>
  );
};

//custom Hook to use the context
export const useReserveContext = () => {
  return useContext(ReserveContext);
};
