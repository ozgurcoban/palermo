import FadeUp from "../ui/FadeUp";
import WallSlides from "./WallSlides";
import WallItem from "./WallItem";

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
    <section className="py-56 overflow-x-hidden border-b bg-[#f9f9f9]">
      <FadeUp>
        <h2 className="title-secondary !text-center">The Wall</h2>
      </FadeUp>
      <div
        style={{ gridTemplateRows: `repeat(${groudImages.length}, minmax(0, 1fr))` }}
        className={`mt-20 gap-8 w-max h-full lg:grid hidden`}
      >
        {groudImages.map((images, index) => {
          return (
           <WallItem direction={index % 2 === 0 ? 1 : -1}  key={`wall-${index}`} images={images} IMAGE_BY_ROW={IMAGE_BY_ROW}/>
          );
        })}
      </div>
      <div className="lg:hidden block mt-20 h-56 px-4">
        <WallSlides images={images} />
      </div>
    </section>
  );
};
