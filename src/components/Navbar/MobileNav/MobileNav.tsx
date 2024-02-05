"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import NavImg from "./NavImg";
import NavBody from "./NavBody";
import { height } from "../anim";
import NavFooter from "./NavFooter";

interface IMobileNav {
  links: { title: string; href: string; src: string }[];
  onCloseMenu: () => void;
}

export const MobileNav: React.FC<IMobileNav> = ({ links, onCloseMenu }) => {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={"overflow-hidden bg-light"}
    >
      <div className={"lg:flex gap-12 mb-20 lg:mb-0 lg:justify-between"}>
        <div className={"flex flex-col justify-between"}>
          <NavBody
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            onClick={onCloseMenu}
          />

          <NavFooter onCloseMenu={onCloseMenu} />
        </div>

        <NavImg
          src={links[selectedLink.index].src}
          selectedLink={selectedLink}
        />
      </div>
    </motion.div>
  );
};
