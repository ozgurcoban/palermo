"use client";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import FadeUp from "../ui/FadeUp";

interface MenuTabs {
  tabs: {
    label: string;
    value: string;
    description: string;
  }[];
  setSelectedTab: React.Dispatch<
    React.SetStateAction<{
      index: number;
      value: string;
    }>
  >;
  selectedTab: number;
}

const MenuTabs: React.FC<MenuTabs> = ({
  tabs,
  selectedTab,
  setSelectedTab,
}) => {
  const previousTab = () => {
    if (selectedTab !== 0)
      setSelectedTab((state) => ({
        value: tabs[state.index - 1].value,
        index: state.index - 1,
      }));
  };

  const nextTab = () => {
    if (selectedTab !== tabs.length - 1)
      setSelectedTab((state) => ({
        value: tabs[state.index + 1].value,
        index: state.index + 1,
      }));
  };

  return (
    <>
      <div className="flex items-center gap-1 md:gap-5 mt-8">
        <button
          title="Previous menu tab"
          aria-live="polite"
          onClick={previousTab}
          disabled={selectedTab === 0}
        >
          <CaretLeftIcon
            width={40}
            height={40}
            className={selectedTab === 0 ? "text-dark/40" : ""}
          />
        </button>
        <ul className="flex sm:flex-row flex-col items-center sm:items-end gap-5">
          {tabs.map((tab, index) => (
            <li
              onClick={() =>
                setSelectedTab((state) => ({ value: tab.value, index }))
              }
              key={tab.value}
            >
              <h3
                className={`cursor-pointer transition-all duration-700 text-center ${
                  selectedTab === index
                    ? "font-lobster text-5xl lg:text-6xl text-accent"
                    : "font-teko text-3xl lg:text-4xl font-light"
                }`}
              >
                {tab.label}
              </h3>
            </li>
          ))}
        </ul>
        <button
          title="Next menu tab"
          aria-live="polite"
          onClick={nextTab}
          disabled={selectedTab === tabs.length - 1}
        >
          <CaretRightIcon
            width={40}
            height={40}
            className={selectedTab === tabs.length - 1 ? "text-dark/40" : ""}
          />
        </button>
      </div>
      <FadeUp delay={1} className="max-auto md:w-5/6">
        <p className="text-center mt-12 text-lg">
          {tabs[selectedTab].description}
        </p>
      </FadeUp>
    </>
  );
};

export default MenuTabs;
