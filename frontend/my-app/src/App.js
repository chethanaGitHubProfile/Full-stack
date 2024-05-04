import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Registerpage from "./Components/RegisterPage";
import LoginPage from "./Components/LoginPage";
// import { AuthProvider } from "./contexts/Auth";
import UserDashboard from "./Components/user/Dashboard";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import PolicyPage from "./Pages/Policy";
import { PageNotFound } from "./Pages/PageNotFound";
import EmployeeRoute from "./Components/Routes/EmployeeRoute";
import EmployeeDashoard from "./Pages/Admin/EmployeeDashboard";
import CategoryContainer from "./Components/Categories/Category-Container";
import Orders from "./Components/user/orders";
import Profile from "./Components/user/Profile";
import ProductsConatiner from "./Components/Products-Container";
import ProductForm from "./Components/Product-form";
import GRNContainer from "./Components/GRN/Grn-Container";
import GRNTable from "./Components/GRN/Grn-Table";
import GRNForm from "./Components/GRN/GRN-Form";
import ReservationContainer from "./Components/Reservation-Dashboard/Reservation-Container";
import ReservationForm from "./Components/Reservation-Dashboard/Reservation-Form";
import ReservationTable from "./Components/Reservation-Dashboard/Reservation-Table";
import ListProducts from "./Components/user/List-Products";
// import CartComponent from "./Components/Cart/Cart-Component";
import CartPage from "./Pages/Cart-Pages";
import CheckOutSuccess from "./Components/Payments/CheckoutSuccess";
// import CartContainer from "./Components/Cart/Cart-Container";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/retailer/listproducts/cart" element={<CartPage />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="retailer" element={<UserDashboard />} />
          <Route path="retailer/orders" element={<Orders />} />
          <Route path="retailer/profile" element={<Profile />} />
          <Route path="retailer/listproducts" element={<ListProducts />} />
        </Route>

        <Route path="/dashboard" element={<EmployeeRoute />}>
          <Route path="employee" element={<EmployeeDashoard />} />
          <Route
            path="employee/create-category"
            element={<CategoryContainer />}
          />
          <Route path="employee/list-product" element={<ProductsConatiner />} />
          <Route path="employee/create-product" element={<ProductForm />} />
          <Route path="employee/list-grn" element={<GRNContainer />} />
          <Route path="employee/list-grn" element={<GRNTable />} />
          <Route path="employee/create-grn" element={<GRNForm />} />
          <Route
            path="employee/list-reserve"
            element={<ReservationContainer />}
          />
          <Route path="employee/list-reserve" element={<ReservationTable />} />
          <Route path="employee/create-reserve" element={<ReservationForm />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="retailer/listproducts/cart" element={<CartComponent />} /> */}
      </Routes>
    </>
  );
}

export default App;
