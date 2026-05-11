import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("user_id"); // ✅ fixed
    if (userId) {
      getCart(userId);
    } else {
      console.log("User not logged in");

    }
  }, []);

  const getCart = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/viewcart/${userId}`
      );

      console.log("VIEW CART RESPONSE 👉", res.data);

      setCart(res.data.data?.products || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  const handleDelete = async (productId) => {
    const userId = localStorage.getItem("user_id");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel"
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/deletecart",
          {
            userId: userId,
            productId: productId
          }

        );
        console.log("response", response)
        if (response.data.success) {
          getCart(userId);
          Swal.fire("Deleted!", "Item removed", "success");
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const increaseQuantity = async (_id) => {
    const userId = localStorage.getItem("user_id");

    try {
      await axios.post("http://localhost:8080/api/v1/addtocart", {
        user: userId,
        product: _id,
        quantity: 1
      });

      getCart(userId); //isseee nhi lgaya toh quantity bdti jayegi backend me show nhi hogi kitni bd gyi aur lgayenge toh quantity backend me bdegi aur yha update hokar show hojayegi
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (_id) => {
    const userId = localStorage.getItem("user_id");

    try {
      await axios.post("http://localhost:8080/api/v1/addtocart", {
        user: userId,
        product: _id,
        quantity: -1
      });

      getCart(userId); // refresh cart
    } catch (error) {      
      console.log(error);
    }
  };

  // const increaseQuantity = (_id) => {
  //   const updatedCart = cart.map(item =>
  //     item._id === _id
  //       ? { ...item, quantity: item.quantity + 1 }
  //       : item
  //   );
  //   setCart(updatedCart);
  // };

  // const decreaseQuantity = (_id) => {
  //   const updatedCart = cart.map(item =>
  //     item._id === _id && item.quantity > 1
  //       ? { ...item, quantity: item.quantity - 1 }
  //       : item
  //   );
  //   setCart(updatedCart);
  // };

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Cart</h2>

      <table className="table">
        <thead>
          <tr>
            <th>image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>

          </tr>
        </thead>

        <tbody>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <tr key={index}>

                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <Link to={`/product?_id=${item._id}`}>
                    {item.name}
                  </Link>
                </td>
                <td>₹{item.price.toLocaleString("en-IN")}</td>
                <td>
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </td>
                <td>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    <i className="fas fa-trash text-danger me-3"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Cart is empty
              </td>
            </tr>
          )}
        </tbody>
      </table>





      <div className="row g-4 justify-content-end">
        <div className="col-8" />
        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
          <div className="bg-light rounded">
            <div className="p-4">
              <h1 className="display-6 mb-4">
                Cart <span className="fw-normal">Total</span>
              </h1>

              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0 me-4">Subtotal:</h5>
                <p className="mb-0 pe-4">
                  ₹
                  {(
                    cart.reduce(
                      (acc, item) =>
                        acc + (item.price) * item.quantity,
                      0
                    )
                  ).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="d-flex justify-content-between">
                {/* <h5 className="mb-0 me-4">Shipping</h5> */}
                {/* <div>
                  <p className="mb-0">Flat rate: ₹50</p>
                </div> */}
              </div>

              {/* <p className="mb-0 text-end">Shipping to India.</p> */}

            </div>


            <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
              <h5 className="mb-0 ps-4 me-4">Total</h5>
              <p className="mb-0 pe-4">
                ₹
                {(
                  cart.reduce(
                    (acc, item) =>
                      acc + (item.price || 0) * item.quantity,
                    0
                  )
                ).toLocaleString("en-IN")}
              </p>
            </div>

            <Link to={cart.length === 0 ? "#" : "/checkout"}
              className="btn btn-primary rounded-pill px-4 py-3 text-uppercase mb-4 ms-4"
              style={{
                pointerEvents: cart.length === 0 ? "none" : "auto",
                opacity: cart.length === 0 ? 0.5 : 1
              }}


            >
              Proceed Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}