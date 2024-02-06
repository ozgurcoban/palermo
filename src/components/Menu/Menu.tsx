"use client";
import React, { useMemo, useState } from "react";
import MenuTabs from "./MenuTabs";
import MenuItems from "./MenuItems";
import FadeUp from "../ui/FadeUp";
import { Component1Icon } from "@radix-ui/react-icons";

const menu_section = {
  title: "Delicious dishes and powerful drinks",
  label: "Our amazing categories",
  categories: [
    {
      label: "Starters",
      value: "starters",
      description: "Starters comes with home baked bread and butter",
    },
    {
      label: "Pizza",
      value: "pizza",
      description: "Tomato sauce and cheese is included in all pizzas",
    },
    {
      label: "Main Coursers",
      value: "main_coursers",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },
    {
      label: "Desserts",
      value: "desserts",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
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
      sub_categories: [],
    },
    {
      id: "2def",
      category: {
        label: "Pizza",
        value: "pizza",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      sub_categories: [
        {
          sub_category_title: "Standard pizza",
          description: "paprika, kronärtskocka, färska ",
          menu_list: [
            {
              id: "item",
              title: "Margarita",
              description:
                "Champinjoner, lök, oliver, paprika, kronärtskocka, färska tomater och ananas",
              price: "110/105",
            },
            {
              id: "item",
              title: "Margarita",
              description:
                "Champinjoner, lök, oliver, paprika, kronärtskocka, färska tomater och ananas",
              price: "110/105",
            },
            {
              id: "item",
              title: "Margarita",
              description:
                "Champinjoner, lök, oliver, paprika, kronärtskocka, färska tomater och ananas",
              price: "110/105",
            },
          ],
        },
        {
          sub_category_title: "Special pizza",
          description: "Champinjoner, lök, oliver",
          menu_list: [
            {
              id: "item",
              title: "Margarita",
              description:
                "Champinjoner, lök, oliver, paprika, kronärtskocka, färska tomater och ananas",
              price: "110/105",
            },
            {
              id: "item",
              title: "Margarita",
              description:
                "Champinjoner, lök, oliver, paprika, kronärtskocka, färska tomater och ananas",
              price: "110/105",
            },
          ],
        },
      ],
      menu_list: [],
    },
    {
      id: "3def",
      category: {
        label: "Main Coursers",
        value: "main_coursers",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      menu_list: [],
      sub_categories: [],
    },
    {
      id: "4def",
      category: {
        label: "Desserts",
        value: "desserts",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      },
      sub_categories: [],
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

export const Menu = () => {
  // The tab category index and its value
  const [tab, setTab] = useState({
    index: 1,
    value: menu_section.categories[1].value,
  });

  // Get the menu list everytime the selected tab changed
  const menus_list = useMemo(() => {
    const filteredList = menu_section.menus.find(
      ({ category: { value } }) => tab.value === value
    );
    if (filteredList)
      return [...filteredList.sub_categories!, ...filteredList.menu_list!];
    else return [];
  }, [tab.value]);

  return (
    <section className="py-32  w-screen border-image">
      <div className="container">
        <FadeUp>
          <h2 className="title-secondary !text-center cursor-default">
            Try us, you'll love us
          </h2>
        </FadeUp>
        <FadeUp
          delay={0.3}
          duration={0.5}
          variants={{ initial: { scaleY: 0 }, animate: { scaleY: 1 } }}
          className="mt-16 rounded-3xl border-[12px] border-accent bg-white w-full"
        >
          <FadeUp
            delay={0.8}
            className="h-[80vh] overflow-hidden lg:px-20 md:px-10 px-5 py-16 flex flex-col items-center"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <Component1Icon />
                <span className="text-dark/80 font-lato text-sm sm:text-md uppercase tracking-wide whitespace-nowrap cursor-default">
                  {menu_section.label}
                </span>
                <Component1Icon />
              </div>
              <MenuTabs
                tabs={menu_section.categories}
                selectedTab={tab.index}
                setSelectedTab={setTab}
              />
            </div>
            <div className="w-full text-center mb-1 mt-8">
              <span className="text-center text-gray-700">
                Servering/Avhämtning
              </span>
              <hr className="mt-4" />
            </div>
            <FadeUp delay={1} className="w-full h-full overflow-y-scroll">
              <MenuItems data={menus_list} />
            </FadeUp>
          </FadeUp>
          <FadeUp delay={0.2}>
            <hr />
          </FadeUp>
        </FadeUp>
      </div>
    </section>
  );
};
