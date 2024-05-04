// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { startGetCart } from "../../actions/Cart-action";
// const CartComponent = () => {
//   const dispatch = useDispatch();
//   const carts = useSelector((state) => {
//     console.log("state", state.carts);
//     return state.carts;
//   });

//   useEffect(() => {
//     const retailerId = "6622261484c887a9beb5e18c";
//     dispatch(startGetCart(retailerId)); // Fetch cart data with retailer ID
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>
//         Listing cart-
//         {carts.data && carts.data.cart ? carts.data.cart.length : 0}
//       </h2>
//     </div>
//   );
// };
// export default CartComponent;
