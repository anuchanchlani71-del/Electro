import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css/navigation';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export default function Slider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/slider");
        if (response.data && response.data.success) {
          setSlides(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };
    fetchSliders();
  }, []);

  return (
    <div className="container-fluid carousel bg-light px-0">
      <div className="row g-0 justify-content-end">
        <div className="col-12 col-lg-7 col-xl-9">
          <Swiper
            modules={[Autoplay]}
            className="mySwiper"
            loop={true}
            autoplay={{
              delay: 4000,
            }}
          >
            {slides.length > 0 ? (
              slides.map((slide, index) => (
                <SwiperSlide key={slide._id || index}>
                  <div className="row g-0 header-carousel-item align-items-center">
                    <div
                      className="col-xl-6 carousel-img wow fadeInLeft"
                      data-wow-delay="0.1s"
                    >
                      <img
                        src={slide.image}
                        className="img-fluid"
                        alt={slide.title || "Slider Image"}
                        style={{ maxHeight: "400px", objectFit: "contain", width: "100%" }}
                      />
                    </div>
                    <div className="col-xl-6 carousel-content p-4">
                      {slide.subtitle && (
                        <h4
                          className="text-uppercase fw-bold mb-4 wow fadeInRight"
                          data-wow-delay="0.1s"
                          style={{ letterSpacing: 3 }}
                        >
                          {slide.subtitle}
                        </h4>
                      )}
                      {slide.title && (
                        <h1
                          className="display-3 text-capitalize mb-4 wow fadeInRight"
                          data-wow-delay="0.3s"
                        >
                          {slide.title}
                        </h1>
                      )}
                      {slide.description && (
                        <p className="text-dark wow fadeInRight" data-wow-delay="0.5s">
                          {slide.description}
                        </p>
                      )}
                      <a
                        className="btn btn-primary rounded-pill py-3 px-5 wow fadeInRight"
                        data-wow-delay="0.7s"
                        href={slide.link || "#"}
                      >
                        Shop Now
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              /* Fallback default hardcoded slide if db is empty */
              <SwiperSlide>
                <div className="row g-0 header-carousel-item align-items-center">
                  <div
                    className="col-xl-6 carousel-img wow fadeInLeft"
                    data-wow-delay="0.1s"
                  >
                    <img
                      src="img/carousel-1.png"
                      className="img-fluid w-100"
                      alt="Image"
                    />
                  </div>
                  <div className="col-xl-6 carousel-content p-4">
                    <h4
                      className="text-uppercase fw-bold mb-4 wow fadeInRight"
                      data-wow-delay="0.1s"
                      style={{ letterSpacing: 3 }}
                    >
                      Save Up To A $400
                    </h4>
                    <h1
                      className="display-3 text-capitalize mb-4 wow fadeInRight"
                      data-wow-delay="0.3s"
                    >
                      On Selected Laptops & Desktop Or Smartphone
                    </h1>
                    <p className="text-dark wow fadeInRight" data-wow-delay="0.5s">
                      Terms and Condition Apply
                    </p>
                    <a
                      className="btn btn-primary rounded-pill py-3 px-5 wow fadeInRight"
                      data-wow-delay="0.7s"
                      href="#"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        <div
          className="col-12 col-lg-5 col-xl-3 wow fadeInRight"
          data-wow-delay="0.1s"
        >
          <div className="carousel-header-banner h-100">
            <img
              src="img/header-img.jpg"
              className="img-fluid w-100 h-100"
              style={{ objectFit: "cover" }}
              alt="Image"
            />
            <div className="carousel-banner-offer">
              <p className="bg-primary text-white rounded fs-5 py-2 px-4 mb-0 me-3">
                Save $48.00
              </p>
              <p className="text-primary fs-5 fw-bold mb-0">Special Offer</p>
            </div>
            <div className="carousel-banner">
              <div className="carousel-banner-content text-center p-4">
                <a href="#" className="d-block mb-2">
                  SmartPhone
                </a>
                <a href="#" className="d-block text-white fs-3">
                  Apple iPad Mini <br /> G2356
                </a>
                <del className="me-2 text-white fs-5">$1,250.00</del>
                <span className="text-primary fs-5">$1,050.00</span>
              </div>
              <a href="#" className="btn btn-primary rounded-pill py-2 px-4">
                <i className="fas fa-shopping-cart me-2" /> Add To Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
