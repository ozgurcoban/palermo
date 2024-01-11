import React from "react";
import MotionDiv from "../ui/MotionDiv";
import FadeUp from "../ui/FadeUp";

import WallSlides from "./WallSlides";

const IMAGE_BY_ROW = 5;

const divideArrayBy = (originalArray: undefined[][]) => {
  // Variable to store the resulting arrays
  const resultArrays = [];

  // Loop through the original array and create subarrays
  for (let i = 0; i < originalArray.length; i += IMAGE_BY_ROW) {
    // Use slice to extract a portion of the original array
    const subarray = originalArray.slice(i, i + IMAGE_BY_ROW);

    // Push the subarray to the resultArrays
    resultArrays.push(subarray);
  }

  return resultArrays;
};

export const Wall = () => {
  const images = new Array(10).fill("");
  const groudImages = divideArrayBy(images);

  return (
    <section className="py-56 overflow-x-hidden">
      <FadeUp>
        <h2 className="title-secondary !text-center">The Wall</h2>
      </FadeUp>
      <div
        style={{ gridTemplateRows: `repeat(${groudImages.length}, minmax(0, 1fr))` }}
        className={`mt-20 gap-8 w-max h-full lg:grid hidden`}
      >
        {groudImages.map((images, i) => {
          return (
            <MotionDiv
              variants={{
                initial: { x: i % 2 === 0 ? "-10%" : "10%" },
                animate: { x: i % 2 === 0 ? "10%" : "-10%" },
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3.2,
              }}
              initial="initial"
              animate={"animate"}
              key={`wall-${i}`}
              style={{ gridTemplateColumns: `repeat(${IMAGE_BY_ROW}, minmax(0, 1fr))` }}
              className={`grid w-max gap-8`}
            >
              {images.map((_, imageIndex) => {
                return (
                  <div
                    key={`wall-image-${imageIndex}`}
                    className={`relative rounded-xl border-2 border-slate-400/10 bg-neutral-100 w-72 h-72 xl:w-96 xl:h-96`}
                  />
                );
              })}
            </MotionDiv>
          );
        })}
      </div>
      <div className="lg:hidden block mt-20 h-56 px-4">
        <WallSlides images={images} />
      </div>
    </section>
  );
};
