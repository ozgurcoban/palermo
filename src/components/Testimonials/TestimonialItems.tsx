"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const testimonials = [
  {
    name: "Louis GL",
    testimonial: `Figma ipsum component variant main layer. Pencil effect reesizing star
        style team project.Figma ipsum component variant main layer. Pencil
        effect reesizing star style team project.`,
  },
  {
    name: "Abdo HM",
    testimonial: `Figma ipsum component variant main layer. Pencil effect reesizing star
        style team project.`,
  },
  {
    name: "Öz C",
    testimonial: `Figma ipsum component variant main layer. Pencil effect reesizing star
        style team project.`,
  },
];

const TestimonialItems = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const previous = () =>
    setSelectedTestimonial((testimonial) =>
      testimonial === 0 ? testimonials.length - 1 : testimonial - 1
    );

  const next = () =>
    setSelectedTestimonial((testimonial) =>
      testimonial === testimonials.length - 1 ? 0 : testimonial + 1
    );

  return (
    <div className="md:max-w-[577px] md:w-max flex-1 md:-mr-24 z-10 green-bg px-10 lg:px-20 py-16 h-full mb-2">
      <div className="flex flex-col gap-11 items-center text-light">
        <div className="flex items-center justify-center gap-20 w-full">
          <button
            title="Previous testimonial"
            aria-live="polite"
            onClick={previous}
          >
            <ArrowLeftIcon width={24} height={24} />
          </button>
          <span className="text-lg">
            {testimonials[selectedTestimonial].name}
          </span>
          <button title="Next testimonial" aria-live="polite" onClick={next}>
            <ArrowRightIcon width={24} height={24} />
          </button>
        </div>
        <p className="text-body text-center">
          {testimonials[selectedTestimonial].testimonial}
        </p>
      </div>
    </div>
  );
};

export default TestimonialItems;
