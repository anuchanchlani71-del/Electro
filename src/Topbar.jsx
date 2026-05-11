import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Topbar() {


  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const [cat_id, setcat_id] = useState("")
  const [cartCount, setCartCount] = useState(0);
  const usertoken = localStorage.getItem("usertoken");

const fetchCartCount = async () => {
  try {
    const user_id = localStorage.getItem("user_id");

    const res = await axios.get(
      `http://localhost:8080/api/v1/cartcount/${user_id}`
    );

    if (res.data.success) {
      setCartCount(res.data.count);
      
    }
  } catch (error) {
    console.log(error);
  }
};



  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You will be logged out of your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("usertoken");
        localStorage.removeItem("user_id");
        navigate('/login', { replace: true });

      }
    });

  };







  const fetchcategory = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/viewcategory")


    if (response.data.success) {
      setCategories(response.data.data || [])
    } else {

    }
  }

 useEffect(() => {
  fetchcategory();
     fetchCartCount();
     const handleCartUpdate = () => {
    fetchCartCount(); // jab signal mile tab API call
  };

  window.addEventListener("cartUpdated", handleCartUpdate);

  return () => {
    window.removeEventListener("cartUpdated", handleCartUpdate);
  };
}, []);






  // const handleLogout = () => {
  //     Swal.fire({
  //         title: 'Are you sure you want to log out?',
  //         text: "You will be logged out of your account.",
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Yes, log out!'
  //     }).then((result) => {
  //         if (result.isConfirmed) {
  //             localStorage.clear();
  //             navigate('/', { replace: true });

  //         }
  //     });

  // };
  // useEffect(() => {
  //     const getToken = localStorage.getItem("adminToken")
  //     if (getToken) {
  //         console.log("token found successfully", getToken)
  //     } else {
  //         // console.log("token not found")
  //         navigate("/login")
  //     }
  // })
  return (
    <div>

      <>
        {/* Spinner Start */}
        {/* <div
    id="spinner"
    className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
  >
    <div
      className="spinner-border text-primary"
      style={{ width: "3rem", height: "3rem" }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div> */}
        {/* Spinner End */}
        {/* Topbar Start */}
        <div className="container-fluid px-5 d-none border-bottom d-lg-block">
          <div className="row gx-0 align-items-center">
            <div className="col-lg-4 text-center text-lg-start mb-lg-0">
              <div
                className="d-inline-flex align-items-center"
                style={{ height: 45 }}
              >
                <a href="#" className="text-muted me-2">
                  {" "}
                  Help
                </a>
                <small> / </small>
                <a href="#" className="text-muted mx-2">
                  {" "}
                  Support
                </a>
                <small> / </small>
                <a href="#" className="text-muted ms-2">
                  {" "}
                  Contact
                </a>
              </div>
            </div>
            <div className="col-lg-4 text-center d-flex align-items-center justify-content-center">
              <small className="text-dark">Call Us:</small>
              <a href="#" className="text-muted">
                (+012) 1234 567890
              </a>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
              <div
                className="d-inline-flex align-items-center"
                style={{ height: 45 }}
              >
                <div className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle text-muted me-2"
                    data-bs-toggle="dropdown"
                  >
                    <small>USD</small>
                  </a>
                  <div className="dropdown-menu rounded">
                    <a href="#" className="dropdown-item">
                      {" "}
                      Euro
                    </a>
                    <a href="#" className="dropdown-item">
                      {" "}
                      Dolar
                    </a>
                  </div>
                </div>
                <div className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle text-muted mx-2"
                    data-bs-toggle="dropdown"
                  >
                    <small>English</small>
                  </a>
                  <div className="dropdown-menu rounded">
                    <a href="#" className="dropdown-item">
                      {" "}
                      English
                    </a>
                    <a href="#" className="dropdown-item">
                      {" "}
                      Turkish
                    </a>
                    <a href="#" className="dropdown-item">
                      {" "}
                      Spanol
                    </a>
                    <a href="#" className="dropdown-item">
                      {" "}
                      Italiano
                    </a>
                  </div>
                </div>
                <div className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle text-muted ms-2"
                    data-bs-toggle="dropdown"
                  >
                    <small>
                      <i className="fa fa-home me-2" /> My Dashboard
                    </small>
                  </a>
                  <div className="dropdown-menu rounded">

                    {/* Agar login nahi hai */}
                    {!usertoken && (
                      <Link to={"/Login"} className="dropdown-item" >
                        Login
                      </Link>
                    )}

                    {/* Agar login hai */}
                    {usertoken && (
                      <>
                        <Link to={"/myprofile"} className="dropdown-item">
                          My Account
                        </Link>

                        <Link to={"/myorders"} className="dropdown-item">
                          My orders
                        </Link>

                        <Link to={"/changepwd"} className="dropdown-item">
                        change password
                        </Link>

                        <button className="dropdown-item" onClick={handleLogout} >
                          Log Out
                        </button>
                      </>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-5 py-4 d-none d-lg-block">
          <div className="row gx-0 align-items-center text-center">
            <div className="col-md-4 col-lg-3 text-center text-lg-start">
              <div className="d-inline-flex align-items-center">
                <Link to={"/"} href="" className="navbar-brand p-0">
                  <h1 className="display-5 text-primary m-0">
                    <i className="fas fa-shopping-bag text-secondary me-2" />
                    Electro
                  </h1>
                  {/* <img src="img/logo.png" alt="Logo"> */}
                </Link>
              </div>
            </div>
            <div className="col-md-4 col-lg-6 text-center">
              <div className="position-relative ps-4">
                <div className="d-flex border rounded-pill">
                  <input
                    className="form-control border-0 rounded-pill w-100 py-3"
                    type="text"
                    data-bs-target="#dropdownToggle123"
                    placeholder="Search Looking For?"
                  />
                  {/* <select
              className="form-select text-dark border-0 border-start rounded-0 p-3"
              style={{ width: 200 }}
            >
              <option value="All Category">All Category</option>
              <option value="Pest Control-2">Category 1</option>
              <option value="Pest Control-3">Category 2</option>
              <option value="Pest Control-4">Category 3</option>
              <option value="Pest Control-5">Category 4</option>
            </select> */}
                  <select

                    className="form-select text-dark border-0 border-start rounded-0 p-3"
                    style={{ width: 250 }}
                    value={cat_id}

                    onChange={(e) => setcat_id(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill py-3 px-5"
                    style={{ border: 0 }}
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 text-center text-lg-end">
              <div className="d-inline-flex align-items-center">
                <a
                  href="#"
                  className="text-muted d-flex align-items-center justify-content-center me-3"
                >
                  <span className="rounded-circle btn-md-square border">
                    <i className="fas fa-random" />
                  </span>
                </a>
                <a
                  href="#"
                  className="text-muted d-flex align-items-center justify-content-center me-3"
                >
                  <span className="rounded-circle btn-md-square border">
                    <i className="fas fa-heart" />
                  </span>
                </a>


                {/* {usertoken && (
                  <Link to={'/cart'}

                    className="text-muted d-flex align-items-center justify-content-center"
                  >


                    <span className="rounded-circle btn-md-square border">
                      <i className="fas fa-shopping-cart" />
                    </span>

                  </Link>
                )} */}
                {usertoken && (
  <Link
    to={"/cart"}
    className="text-muted d-flex align-items-center justify-content-center position-relative"
  >
    <span className="rounded-circle btn-md-square border">
      <i className="fas fa-shopping-cart" />
    </span>

    {cartCount > 0 && (
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{ fontSize: "10px" }}
      >
        {cartCount}
      </span>
    )}
  </Link>
)}
              </div>
            </div>
          </div>
        </div>
        {/* Topbar End */}
      </>

    </div>
  )
}
