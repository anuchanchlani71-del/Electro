import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
   const [first_name,setfirst_name]=useState("")
    const[last_name,setlast_name]=useState("")
  const [email,setemail]=useState("")
  const[address,setaddress]=useState("")
  const[mobile,setmobile]=useState("")
  const [paymentMode, setPaymentMode] = useState("");
   
  
      
    const get_id=localStorage.getItem("user_id")
  const userId = localStorage.getItem("user_id"); 
  useEffect(() => {
  
    if (userId) {
      getCart(userId);
      myprofile(userId)
    } else {
      console.log("User not logged in");

    }
  }, [userId]);






const myprofile=async()=>{

  const response=await axios.get("http://localhost:8080/api/v1/myprofile",   { params: { _id: get_id }})

  console.log("response",response)


  if(response.data.success){
    setfirst_name(response.data.data.first_name)
      setlast_name(response.data.data.last_name)
        setemail(response.data.data.email)
          setaddress(response.data.data.address)
         
              setmobile(response.data.data.mobile)
  }
}






  const getCart = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/viewcart/${userId}`
      );

      console.log("VIEW CART RESPONSE2 ", res.data);

      setCart(res.data.data?.products );

    } catch (err) {
      console.log(err);

    }
  };

const handlePlaceOrder = async () => {




  if (!paymentMode) {
  toast.error("Please select payment method");
  return;
}
  const result = await Swal.fire({
    title: 'Are you sure you want to place this order?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, place order!'
  });

  if (!result.isConfirmed)
    return;

  try {

    if (!userId) {
      alert("User not logged in");
      return;
    }



    const res = await axios.post(
      "http://localhost:8080/api/v1/placeorder",
      { userId, paymentMode }
    );

    if (res.data.success) {
             getCart(userId);
             Swal.fire("placed!", res.data.message, "success");
           } else {
             Swal.fire("Error", res.data.message, "error");
         
           }

  } catch (error) {
    console.log(error);
   

  }
};



  return (
  
    <div> 
      <Toaster/>
      <>
  
      <div className="container-fluid bg-light overflow-hidden py-5">
        <div className="container py-5">
          <h1 className="mb-4 wow fadeInUp" data-wow-delay="0.1s">
            Billing details
          </h1>
          <form action="#">
            <div className="row g-5">
              <div
                className="col-md-12 col-lg-6 col-xl-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <label className="form-label my-3">
                        First Name<sup>*</sup>
                      </label>
                      <input  value={first_name} type="text" className="form-control"  readOnly/>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <label className="form-label my-3">
                        Last Name<sup>*</sup>
                      </label>
                      <input  value={last_name} type="text" className="form-control"  readOnly/>
                    </div>
                  </div>
                </div>
                {/* <div className="form-item">
                  <label className="form-label my-3">
                    Company Name<sup>*</sup>
                  </label>
                  <input  type="text" className="form-control" readOnly />
                </div> */}
                <div className="form-item" readOnly>
                  <label className="form-label my-3">
                    Address <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    value={address}
                    className="form-control"
                    placeholder="House Number Street Name"
                  />
                </div>
                {/* <div className="form-item">
                  <label className="form-label my-3">
                    Town/City<sup>*</sup>
                  </label>
                  <input  type="text" className="form-control" readOnly />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Country<sup>*</sup>
                  </label>
                  <input type="text" className="form-control" readOnly />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Postcode/Zip<sup>*</sup>
                  </label>
                  <input type="text" className="form-control" readOnly />
                </div> */}
                <div className="form-item">
                  <label className="form-label my-3">
                    Mobile<sup>*</sup>
                  </label>
                  <input value={mobile} type="tel" className="form-control"  readOnly/>
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Email Address<sup>*</sup>
                  </label>
                  <input value={email} type="email" className="form-control" readOnly/>
                </div>
              
                <hr />
               
              
              </div>
              <div
                className="col-md-12 col-lg-6 col-xl-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr className="text-center"  style={{color:"#000"}}>
                        <th scope="col" className="text-start">
                          Image
                        </th>
                          <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.length > 0 ? (
                        cart.map((item, index) => (
                         <tr key={index} className="text-center">
  <td>
    <img
      src={item.image}
      alt={item.name}
      style={{ width: "80px", height: "70px", objectFit: "cover" }}
    />
  </td>

  <td>
    <Link to={`/product?_id=${item._id}`} style={{ color: "#000" }}>
      {item.name}
    </Link>
  </td>

  <td style={{ color: "#000" }}>
    ₹{item.price.toLocaleString("en-IN")}
  </td>

  <td style={{ color: "#000" }}>
    {item.quantity}
  </td>

  <td style={{ color: "#000" }}>
    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
  </td>
</tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            Cart is empty
                          </td>
                        </tr>
                      )}

                      <tr>
                        <th scope="row"></th>
                        <td className="py-4" />
                        <td className="py-4" />
                        <td className="py-4">
                          <p className="mb-0 text-dark py-2">Subtotal</p>
                        </td>
                        <td className="py-4">
                          <div className="py-2 text-center border-bottom border-top">
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
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"></th>
                        <td className="py-4">
                          <p className="mb-0 text-dark text-uppercase py-2">
                            TOTAL
                          </p>
                        </td>
                        <td className="py-4" />
                        <td className="py-4" />
                        <td className="py-4">
                          <div className="py-2 text-center border-bottom border-top">
                            <p className="mb-0 pe-4">
                              ₹
                              {cart
                                .reduce(
                                  (acc, item) =>
                                    acc + (item.price || 0) * item.quantity,
                                  0
                                )
                                .toLocaleString("en-IN")}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <div className="row g-0 text-center align-items-center justify-content-center border-bottom py-2">
                  <div className="col-12">
                    <div className="form-check text-start my-2">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Transfer-1"
                        name="Transfer"
                        defaultValue="Transfer"
                      />
                      <label className="form-check-label" htmlFor="Transfer-1">
                        Direct Bank Transfer
                      </label>
                    </div>
                    <p className="text-start text-dark">
                      Make your payment directly into our bank account. Please use
                      your Order ID as the payment reference. Your order will not be
                      shipped until the funds have cleared in our account.
                    </p>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-2">
                  <div className="col-12">
                    <div className="form-check text-start my-2">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Payments-1"
                        name="Payments"
                        defaultValue="Payments"
                      />
                      <label className="form-check-label" htmlFor="Payments-1">
                        Check Payments
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-2">
                  <div className="col-12">
                    <div className="form-check text-start my-2">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Delivery-1"
                        name="Delivery"
                        defaultValue="Delivery"
                      />
                      <label className="form-check-label" htmlFor="Delivery-1">
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-2">
                  <div className="col-12">
                    <div className="form-check text-start my-2">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Paypal-1"
                        name="Paypal"
                        defaultValue="Paypal"
                      />
                      <label className="form-check-label" htmlFor="Paypal-1">
                        Paypal
                      </label>
                    </div>
                  </div>
                </div> */}


                <div className="row g-0 text-center align-items-center justify-content-center border-bottom py-2">
  <div className="col-12">

    <div className="form-check text-start my-2">
      <input
        type="radio"
        className="form-check-input"
        name="payment"
        value="ONLINE"
        checked={paymentMode === "ONLINE"}
        onChange={(e) => setPaymentMode(e.target.value)}
      />
      <label className="form-check-label">
        Direct Bank Transfer
      </label>
    </div>

    <div className="form-check text-start my-2">
      <input
        type="radio"
        className="form-check-input"
        name="payment"
        value="COD"
        checked={paymentMode === "COD"}
        onChange={(e) => setPaymentMode(e.target.value)}
      />
      <label className="form-check-label">
        Cash On Delivery
      </label>
    </div>

    <div className="form-check text-start my-2">
      <input
        type="radio"
        className="form-check-input"
        name="payment"
        value="UPI"
        checked={paymentMode === "UPI"}
        onChange={(e) => setPaymentMode(e.target.value)}
      />
      <label className="form-check-label">
        UPI Payment
      </label>
    </div>

  </div>
</div>
                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button

                    type="button"
                    className="btn btn-primary border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                      onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Checkout Page End */}
    </>
    </div>
  )
}
