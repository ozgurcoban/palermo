import React from "react";

interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
}

const MenuItem: React.FC<MenuItem> = ({ description, price, title }) => {
  return (
    <li className="flex items-center gap-4">
      <div className="flex flex-col">
        <h4 className="font-recoleta font-light text-4xl tracking-tight">{title}</h4>
        <span className="text-lg font-lato text-dark/85">{description}</span>
      </div>
      <div className="w-full flex-1 h-[1px] bg-accent" />
      <span className="font-lobster text-xl text-accent">{price}kr</span>
    </li>
  );
};

export default MenuItem;
