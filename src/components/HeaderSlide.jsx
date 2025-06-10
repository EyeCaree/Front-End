import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import poster1 from "../asset/Poster1.png";
import poster2 from "../asset/Poster2.png";
import "../styles/HeaderSlide.css";

function Headerslide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings} className="custom-carousel">
        <div>
          <img src={poster1} alt="Poster1" className="carousel-img" />
        </div>
        <div>
          <img src={poster2} alt="Poster2" className="carousel-img" />
        </div>
      </Slider>
    </div>
  );
}

export default Headerslide;
