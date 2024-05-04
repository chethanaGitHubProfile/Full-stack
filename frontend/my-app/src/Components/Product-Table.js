import { ProductContext } from "../contexts/root-context";
import { useContext } from "react";
import axios from "axios";

//update reserveStock in product
export async function updateReserveQuantity(
  productId,
  newReserveQuantity,
  setProducts
) {
  try {
    const response = await axios.put(
      `http://localhost:3055/api/product/updatereserve/${productId}`,
      { reserveQuantity: newReserveQuantity }
    );

    //update products state with the updated product data
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product._id === product) {
          return { ...product, reserveQuantity: newReserveQuantity };
        }
        return product;
      });
      return updatedProducts;
    });
    console.log("Products reserve quantity updated : ", response.data);
  } catch (error) {
    console.log("Error updating reserve quantity", error);
  }
}

//update product Stock
export async function updateStockQuantity(
  productId,
  newStockQuantity,
  setProducts
) {
  try {
    const response = await axios.patch(
      `http://localhost:3055/api/products/${productId}`,
      { quantity: newStockQuantity }
    );
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product._id === product) {
          return { ...product, stock: newStockQuantity };
        }
        return product;
      });
      return updatedProducts;
    });
    console.log("products GRN Qty updated", response.data);
  } catch (error) {
    console.log("error updating grn quantity", error);
  }
}

export default function ProductTable() {
  // console.log("product props", props.products);
  const { products, setProducts } = useContext(ProductContext);

  let serialNumber = 0;

  return (
    <div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>productId</th>
              <th>product Name</th>
              <th>Stock</th>
              <th>Mrp</th>
              <th>B2BPrice</th>
              <th>discount</th>
              <th>reserveStock</th>
              <th>Status</th>
              <th>categoryId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.data.map((ele) => {
              serialNumber++;
              const productId = `PR${serialNumber.toString().padStart(2, "0")}`;
              return (
                <tr key={productId}>
                  <td>{serialNumber}</td>
                  <td>{productId}</td>
                  <td>{ele.name}</td>
                  <td>{ele.stock}</td>
                  <td>{ele.mrp}</td>
                  <td>{ele.B2BPrice}</td>
                  <td>{ele.discount}</td>
                  <td>{ele.reserveStock}</td>
                  <td>{ele.status}</td>
                  <td>{ele.categoryId}</td>
                  <td>
                    <button className="btn btn-primary ms-2">Show</button>
                    <button className="btn btn-primary ms-2">edit</button>
                    <button className="btn btn-danger ms-2">remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
