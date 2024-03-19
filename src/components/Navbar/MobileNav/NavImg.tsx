import React from "react";
import { motion } from "framer-motion";
import { opacity } from "../anim";
import Image from "next/image";

interface INavImg {
  src: string;
  selectedLink: {
    isActive: boolean;
    index: number;
  };
}

const NavImg: React.FC<INavImg> = ({ src, selectedLink }) => {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={selectedLink.isActive ? "open" : "closed"}
      className={"hidden lg:block w-[500px] h-[350px] relative"}
    >
      <Image
        src={`/images/${src}`}
        fill={true}
        alt={`palermo ${src} image`}
        className="object-cover"
      />
    </motion.div>
  );
};

export default NavImg;
