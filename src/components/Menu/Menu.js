import React, { useState } from 'react';
import styled from 'styled-components';
import Categories from './Components/Categories';
import MenuList from './Components/MenuList';
import items from './data';

const allCategories = ['alla', ...new Set(items.map(item => item.category))];

const categoryId = items.map(category => {
  return category.categoryid;
});
const Menu = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = category => {
    if (category === 'alla') {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter(item => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <>
      <Categories categories={categories} filterItems={filterItems} />
      <MenuList key={categoryId} items={menuItems} />
    </>
  );
};

export default Menu;
