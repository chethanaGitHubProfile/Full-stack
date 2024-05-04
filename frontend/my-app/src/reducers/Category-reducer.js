export default function categoryReducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY": {
      return { ...state, data: action.payload };
    }
    default: {
      return { ...state };
    }
  }
}
