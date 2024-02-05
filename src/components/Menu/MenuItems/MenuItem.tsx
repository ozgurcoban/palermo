import React from "react";

interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
}

const MenuItem: React.FC<MenuItem> = ({ description, price, title }) => {
  return (
    <li className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h4 className="font-recoleta font-light text-lg tracking-tight">
          {title}
        </h4>
        <div className="mx-2 flex-1 border border-dashed border-accent" />
        <span className="font-lobster text-md text-accent self-start">
          {price}kr
        </span>
      </div>
      <span className="text-md font-lato text-dark/85">{description}</span>
    </li>
  );
};

export default MenuItem;
