import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import configureStore from "./store/ConfigureStore";
import "antd/dist/reset.css";
import { AuthProvider } from "./contexts/Auth";
import "antd/dist/reset.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/cart";

// const store = configureStore();
// console.log("cart details", store.getState());
// store.subscribe(() => {
//   console.log("cart details", store.getState());
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      {/* <Provider store={store}> */}
      <CartProvider>
        <App />
      </CartProvider>
      {/* </Provider> */}
    </AuthProvider>
  </BrowserRouter>
);
