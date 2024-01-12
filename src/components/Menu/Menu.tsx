"use client";
import React, { useEffect, useMemo, useState } from "react";
import MenuTabs from "./MenuTabs";
import MenuItems from "./MenuItems";
import MenuPagination from "./MenuPagination";
import FadeUp from "../ui/FadeUp";

const menu_section = {
  title: "Delicious dishes and powerful drinks",
  label: "Our amazing categories",
  categories: [
    {
      label: "Starters",
      value: "starters",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      label: "Pizza",
      value: "pizza",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      label: "Main Coursers",
      value: "main_coursers",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      label: "Desserts",
      value: "desserts",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ],
  menus: [
    {
      id: "1def",
      category: {
        label: "Starters",
        value: "starters",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      menu_list: [],
    },
    {
      id: "2def",
      category: {
        label: "Pizza",
        value: "pizza",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      menu_list: [
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
      ],
    },
    {
      id: "3def",
      category: {
        label: "Main Coursers",
        value: "main_coursers",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      menu_list: [
        {
          id: "item",
          title: "Main Coursers",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
      ],
    },
    {
      id: "4def",
      category: {
        label: "Desserts",
        value: "desserts",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      menu_list: [
        {
          id: "item",
          title: "Desserts",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
        {
          id: "item",
          title: "Margarita",
          description: "Tomat och ost.",
          price: "110/105",
        },
      ],
    },
  ],
};

const PAGE_SIZE = 12;

export const Menu = () => {
  // The tab category index and its value
  const [tab, setTab] = useState({
    index: 1,
    value: menu_section.categories[1].value,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Get the menu list everytime the selected tab changed
  const menus_list = useMemo(
    () =>
      menu_section.menus.find(({ category: { value } }) => tab.value === value)
        ?.menu_list,
    [tab.value]
  );

  // When the tab changed, we go back to the page 1
  useEffect(() => setCurrentPage(1), [tab.index]);

  // Get the data divided by PAGE_SIZE
  const currentTableMenus = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return menus_list?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, menus_list, PAGE_SIZE]);

  return (
    <section className="py-32  w-screen border-image">
      <div className="container">
        <FadeUp>
          <h2 className="title-secondary !text-center">Try our special dishes</h2>
        </FadeUp>
        <FadeUp
          delay={0.3}
          duration={0.5}
          variants={{ initial: { scaleY: 0 }, animate: { scaleY: 1 } }}
          className="mt-16 rounded-3xl border-[12px] border-accent bg-white w-full h-full"
        >
          <FadeUp
            delay={0.8}
            className="lg:px-20 md:px-10 px-5 py-16 flex flex-col items-center"
          >
            <span className="text-dark/80 font-lato text-xl tracking-wide">
              {menu_section.label}
            </span>
            <MenuTabs
              tabs={menu_section.categories}
              selectedTab={tab.index}
              setSelectedTab={setTab}
            />
            <FadeUp delay={1} className="w-full h-full mt-8">
              <hr />
              <MenuItems data={currentTableMenus} />
            </FadeUp>
          </FadeUp>
          <FadeUp delay={2.5}>
            <hr />
          </FadeUp>
          <MenuPagination
            PAGE_SIZE={PAGE_SIZE}
            currentPage={currentPage}
            menus_list={menus_list}
            setCurrentPage={setCurrentPage}
          />
        </FadeUp>
      </div>
    </section>
  );
};
