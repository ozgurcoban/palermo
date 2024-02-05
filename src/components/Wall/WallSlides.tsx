"use client";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const WallSlides = ({ images }: { images: any[] }) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      navigation
      modules={[Navigation, Pagination]}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }}
      slidesPerView={1}
      spaceBetween={10}
    >
      {images.map((_, i) => (
        <SwiperSlide key={`wall-image-${i}`}>
          <div className="mx-auto h-64 relative rounded-xl border-2 border-slate-400/10 bg-neutral-100" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WallSlides;
