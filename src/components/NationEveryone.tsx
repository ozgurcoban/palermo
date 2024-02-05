import React from "react";
import MaskText from "./ui/MaskText";

const NationEveryone = () => {
  return (
    <section className="w-full h-[50vh] flex items-center justify-center">
      <h2 className="md:text-[4vw] text-[8vw] w-full">
        <MaskText
          delay={0.2}
          phrases={["The Nation for Everyone"]}
          className="font-recoleta leading-tight font-semibold text-center"
        />
      </h2>
    </section>
  );
};

export default NationEveryone;
