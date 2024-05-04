import axios from "axios";
import { useAuth } from "../../contexts/Auth";
// import { url } from ".";

export default function PayButton({ cart }) {
  const [auth, setAuth] = useAuth();
  const handleCheckout = () => {
    // console.log("cart", cart);
    axios
      .post("http://localhost:3055/create-checkout-session", {
        cart,
        userId: auth?.tokenData?._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <button onClick={() => handleCheckout()}>Check Out</button>
    </>
  );
}
