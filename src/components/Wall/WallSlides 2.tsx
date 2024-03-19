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
import Image from "next/image";
import urlFor from "@/lib/urlFor";

const WallSlides = ({ images }: { images: Image[] }) => {
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
      {images.map((image, i) => (
        <SwiperSlide key={image._key}>
          <div className="mx-auto h-64 relative rounded overflow-hidden">
            <Image
              src={urlFor(image).url()}
              alt={urlFor(image).url()}
              fill
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WallSlides;
