import FadeUp from "@/components/ui/FadeUp";
import React from "react";

interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
  index: number;
}

const MenuItem: React.FC<MenuItem> = ({ description, price, title, index }) => {
  return (
    <li>
      <FadeUp className="flex items-center gap-4" delay={1.2 + index * 0.1}>
        <div className="flex flex-col">
          <h4 className="font-teko font-light text-5xl">{title}</h4>
          <span className="text-lg font-lato text-dark/85">{description}</span>
        </div>
        <div className="w-full flex-1 h-[1px] bg-accent" />
        <span className="font-lobster text-xl text-accent">{price}kr</span>
      </FadeUp>
    </li>
  );
};

export default MenuItem;
