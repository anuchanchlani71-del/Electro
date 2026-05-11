import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart } from "../Cart.jsx/Addtocart"; 
import Swal from 'sweetalert2';
import { Toaster } from 'react-hot-toast';

export default function OurProduct() {
   const [Product, setProduct] = useState([]);
const fetchproduct=async()=>{
  const response=await axios.get("http://localhost:8080/api/v1/viewproduct")
    console.log("response", response)
         setProduct(response.data.data || [])
}
  useEffect(() => {
       
        fetchproduct();
    }, [])

const navigate = useNavigate();

  return (
    <div><>
  {/* Our Products Start */}
  <Toaster/>
  <div className="container-fluid product pt-5">
    <div className="container py-5">
      <div className="tab-class">
        <div className="row g-4">
          <div
            className="col-lg-4 text-start wow fadeInLeft"
            data-wow-delay="0.1s"
          >
            <h1>Our Products</h1>
          </div>
          <div
            className="col-lg-8 text-end wow fadeInRight"
            data-wow-delay="0.1s"
          >
            <ul className="nav nav-pills d-inline-flex text-center mb-5">
              <li className="nav-item mb-4">
                <a
                  className="d-flex mx-2 py-2 bg-light rounded-pill active"
                  data-bs-toggle="pill"
                  href="#tab-1"
                >
                  <span className="text-dark" style={{ width: 130 }}>
                    All Products
                  </span>
                </a>
              </li>
              <li className="nav-item mb-4">
                <a
                  className="d-flex py-2 mx-2 bg-light rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-2"
                >
                  <span className="text-dark" style={{ width: 130 }}>
                    New Arrivals
                  </span>
                </a>
              </li>
              <li className="nav-item mb-4">
                <a
                  className="d-flex mx-2 py-2 bg-light rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-3"
                >
                  <span className="text-dark" style={{ width: 130 }}>
                    Featured
                  </span>
                </a>
              </li>
              <li className="nav-item mb-4">
                <a
                  className="d-flex mx-2 py-2 bg-light rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-4"
                >
                  <span className="text-dark" style={{ width: 130 }}>
                    Top Selling
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div id="tab-1" className="tab-pane fade show p-0 active">
            <div className="row g-4">
              
             
                {Product.map((item, index) => (
    <div
      key={item._id || index}
      className="col-md-6 col-lg-4 col-xl-3"
    >
      <div
        className="product-item rounded wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="product-item-inner border rounded">
             <Link to={`/product?_id=${item._id}`} className="d-block mb-2">
          <div className="product-item-inner-item">
            <img
  src={item.image || "img/product-1.png"}
  className="img-fluid w-100 rounded-top"
  alt={item.name}
  style={{
    height: "400px",
    objectFit: "cover"
  }}
/>

            {/* Optional tags */}
            {item.isNew && <div className="product-new">New</div>}
            {item.isSale && <div className="product-sale">Sale</div>}

            <div className="product-details">
              <a href="#">
                <i className="fa fa-eye fa-1x" />
              </a>
            </div>
          </div>

          <div className="text-center rounded-bottom p-4">
         
           
            
            

            <a href="#" className="d-block h4">
              {item.name}
            </a>

            <del className="me-2 fs-5">
              ₹{item.oldPrice || item.price + 200}
            </del>

            <span className="text-primary fs-5">
              ₹{item.price.toLocaleString("en-IN")}
            </span>
            
          </div>
          </Link>
        </div>

        <div className="product-item-add border border-top-0 rounded-bottom text-center p-4 pt-0">
   
<a
  className="btn btn-primary border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
  href="#"
  onClick={(e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id"); 
    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to add items to cart",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login"); 
      });
      return;
    }
    addToCart(item._id, item.price);
    // navigate("/cart");
  }}
>
  <i className="fa fa-shopping-bag me-2 text-white" />
  Add to cart
</a>

          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star" />
            </div>

            <div className="d-flex">
              <a
                href="#"
                className="text-primary d-flex align-items-center justify-content-center me-3"
              >
                <span className="rounded-circle btn-sm-square border">
                  <i className="fas fa-random" />
                </span>
              </a>

              <a
                href="#"
                className="text-primary d-flex align-items-center justify-content-center me-0"
              >
                <span className="rounded-circle btn-sm-square border">
                  <i className="fas fa-heart" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
              {/* <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-4.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-sale">sale</div>
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                     <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-5.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                    <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-6.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-new">New</div>
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                     <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-7.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-sale">Sale</div>
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                     <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-8.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                     <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-9.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-new">New</div>
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                     <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-10.png"
                        className="img-fluid w-100 rounded-top"
                        alt=""
                      />
                      <div className="product-sale">Sale</div>
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                     <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/* <div id="tab-2" className="tab-pane fade show p-0">
            <div className="row g-4">
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-3.png"
                        className="img-fluid rounded-top"
                        alt=""
                      />
                      <div className="product-new">New</div>
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                     <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-4.png"
                        className="img-fluid w-100 rounded-top"
                        alt=""
                      />
                      <div className="product-new">New</div>
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div  className="text-center rounded-bottom p-4">
                    <Link to={"/product"}className="d-block mb-2">
                        SmartPhone
                      </Link>



                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-5.png"
                        className="img-fluid w-100 rounded-top"
                        alt=""
                      />
                      <div className="product-new">New</div>
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                     <Link to={"/product"}className="d-block mb-2">
                        SmartPhone
                    </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-6.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-new">New</div>
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                     <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div id="tab-3" className="tab-pane fade show p-0">
            <div className="row g-4">
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-9.png"
                        className="img-fluid w-100 rounded-top"
                        alt=""
                      />
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                   <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-10.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                    <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-11.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                   <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-12.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                   <Link to={"/product"}className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div id="tab-4" className="tab-pane fade show p-0">
            <div className="row g-4">
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-14.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                   <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-15.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                    <Link to={"/product"} className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-17.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                  <Link to={"/product"}className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="product-item rounded wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="product-item-inner border rounded">
                    <div className="product-item-inner-item">
                      <img
                        src="img/product-16.png"
                        className="img-fluid w-100 rounded-top"
                        alt="Image"
                      />
                      <div className="product-details">
                        <a href="#">
                          <i className="fa fa-eye fa-1x" />
                        </a>
                      </div>
                    </div>
                    <div className="text-center rounded-bottom p-4">
                    <Link to={"/product"}className="d-block mb-2">
                        SmartPhone
                      </Link>
                      <a href="#" className="d-block h4">
                        Apple iPad Mini <br /> G2356
                      </a>
                      <del className="me-2 fs-5">$1,250.00</del>
                      <span className="text-primary fs-5">$1,050.00</span>
                    </div>
                  </div>
                  <div className="product-item-add border border-top-0 rounded-bottom  text-center p-4 pt-0">
                    <a
                      href="#"
                      className="btn btn-primary border-secondary rounded-pill py-2 px-4 mb-4"
                    >
                      <i className="fas fa-shopping-cart me-2" /> Add To Cart
                    </a>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                      <div className="d-flex">
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-3"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-random" />
                          </span>
                        </a>
                        <a
                          href="#"
                          className="text-primary d-flex align-items-center justify-content-center me-0"
                        >
                          <span className="rounded-circle btn-sm-square border">
                            <i className="fas fa-heart" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </div>
  {/* Our Products End */}
</>
</div>
  )
}
