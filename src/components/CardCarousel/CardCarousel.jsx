import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProArtisanCard from "./../ProArtisanCard/ProArtisanCard";
import "./CardCarousel.scss";

function CardCarousel({ items }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="CardCarousel">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerclassName="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={"desktop"}
        dotListclassName="custom-dot-list-style"
        itemclassName="carousel-item-padding-40-px"
      >
        {items.map((profile, index) => {
          return <ProArtisanCard profile={profile} key={index} />;
        })}
      </Carousel>
    </div>
  );
}

export default CardCarousel;
