import React from "react";
import FadeUp from "../ui/FadeUp";
import TestimonialItems from "./TestimonialItems";
import Image from "next/image";
import HappyFace from "../../../public/images/happy-face.jpg"

export const Testimonials = () => {
  return (
    <section className="py-56 w-screen">
      <div className="container">
        <FadeUp>
          <h2 className="title-secondary !text-center">
            What do our customers say about Palermo
          </h2>
        </FadeUp>
        <div className="flex md:flex-row flex-col-reverse w-full mt-32 items-center md:items-end overflow-x-hidden">
          <TestimonialItems />
          <Image src={HappyFace} alt="happy Palermo" width={1920} height={1080} className="object-cover max-w-[600px]"  />
        </div>
      </div>
    </section>
  );
};
