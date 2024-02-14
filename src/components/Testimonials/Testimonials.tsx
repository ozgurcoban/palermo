"use client";

import React, { useState } from "react";
import FadeUp from "../ui/FadeUp";
import TestimonialItems from "./TestimonialItems";
import Image from "next/image";
import { useGetLocale } from "@/config";
import urlFor from "@/lib/urlFor";

type Props = {
  data?: TestimonialSection;
};

export const Testimonials: React.FC<Props> = ({ data }) => {
  const locale = useGetLocale();
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  if (!data) return;

  const { title, testimonials } = data;
  return (
    <section className="py-56 w-screen">
      <div className="container">
        <FadeUp>
          <h2 className="title-secondary !text-center">{title?.[locale]}</h2>
        </FadeUp>
        <div className="flex md:flex-row flex-col-reverse w-full mt-32 items-center overflow-x-hidden">
          <TestimonialItems
            testimonials={testimonials}
            selectedTestimonial={selectedTestimonial}
            setSelectedTestimonial={setSelectedTestimonial}
          />
          <Image
            src={urlFor(testimonials[selectedTestimonial].image).url()}
            alt="happy Palermo"
            width={1920}
            height={1080}
            className="object-cover max-w-[600px] max-h-[600px]"
          />
        </div>
      </div>
    </section>
  );
};
