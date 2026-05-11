
import React, { useEffect, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { addToCart } from "../Cart.jsx/Addtocart";
import Swal from 'sweetalert2';
import { Toaster } from 'react-hot-toast';

export default function RelatedProduct() {




  const [searchParams] = useSearchParams();
  const _id = searchParams.get("_id");

  const [product, setproduct] = useState([])
  const [cat_id, setcat_id] = useState("")
  const fetchproduct = async () => {

    const response = await axios.get(`http://localhost:8080/api/v1/findproduct?_id=${_id}`);
    // console.log("responseview", response)
    if (response.data.success) {
      const data = response.data.data
      setcat_id(data.cat_id._id)

    }
  }


  const relatedproduct = async () => {
    const response = await axios.get(`http://localhost:8080/api/v1/searchproductbycat?_id=${cat_id}`)
    console.log("responsesearch", response)
    if (response.data.success) {
      setproduct(response.data.data);
    }
    else {
      console.log(response.data.message);
    }
  }


  useEffect(() => {
    if (cat_id) {
      relatedproduct();
    }
    fetchproduct();
  }, [cat_id])










  const navigate = useNavigate();

  return (


    <div className="container-fluid related-product">
      <Toaster/>
      <div className="container">
        <div className="mx-auto text-center pb-5" style={{ maxWidth: "700px" }}>
          <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius wow fadeInUp"
            data-wow-delay="0.1s">Related Products</h4>
          <p className="wow fadeInUp" data-wow-delay="0.2s">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Modi, asperiores ducimus sint quos tempore officia similique quia? Libero, pariatur consectetur?</p>
        </div>





        <Swiper
          modules={[Autoplay]}
          className="mySwiper"
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 4000,
          }}
        >
          {product.map((item, index) => (
            <SwiperSlide key={index}>

              <div className="related-item rounded border position-relative overflow-hidden">
                <Link to={`/product?_id=${item._id}`} target='blank'>
                  <div className="related-item-inner">



                    <img src={item.image || "img/product-3.png"} className="img-fluid w-100" alt={item.name} style={{
                      height: "400px",
                      objectFit: "cover"
                    }} />
                    <div className="text-center p-4">
                      {/* <a href="#" className="d-block mb-2">{item.category || "Category"}</a> */}
                      <a href="#" className="d-block h4">{item.name}</a>
                      <del className="me-2 fs-5">{item.oldPrice}</del>
                      <span className="text-primary fs-5">   ₹{item.price.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </Link>

                <div
                  className="related-item-add text-center w-100 bg-white"
                  style={{
                    position: 'absolute',
                    bottom: '-60px',
                    left: 0,
                    transition: '0.3s'
                  }}
                >
                  {/* <a
                    className="btn btn-primary border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(item._id, item.price);
                      navigate("/cart");
                    }}
                  >
                    <i className="fa fa-shopping-bag me-2 text-white" />
                    Add to cart
                  </a> */}

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
 
                </div>

                <style>{`
        .related-item:hover .related-item-add {
          bottom: 0 !important;
        }
      `}</style>

              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  )
}
