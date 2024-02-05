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
      setSelectedTab(state => ({
        value: tabs[state.index - 1].value,
        index: state.index - 1,
      }));
  };

  const nextTab = () => {
    if (selectedTab !== tabs.length - 1)
      setSelectedTab(state => ({
        value: tabs[state.index + 1].value,
        index: state.index + 1,
      }));
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_4fr_1fr] justify-between gap-1 md:gap-5 mt-6">
        <button
          title="Previous menu tab"
          aria-live="polite"
          onClick={previousTab}
          disabled={selectedTab === 0}
          className="hidden sm:inline-block flex-initial"
        >
          <CaretLeftIcon
            width={40}
            height={40}
            className={selectedTab === 0 ? "text-dark/40" : ""}
          />
        </button>

        <ul className="flex-1 grid grid-cols-4 items-center md:gap-4 justify-center min-h-[50px] transition-all duration-200">
          {tabs.map((tab, index) => (
            <li
              onClick={() =>
                setSelectedTab(state => ({ value: tab.value, index }))
              }
              key={tab.value}
            >
              <h3
                className={`cursor-pointer transition-all duration-200 text-center ${
                  selectedTab === index
                    ? "font-lobster text-2xl lg:text-xl text-accent"
                    : "font-lato text-1xl lg:text-lg text-dark/85"
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
          className="hidden sm:inline-block justify-self-end"
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
