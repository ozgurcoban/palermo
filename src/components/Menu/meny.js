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
    <Page>
      <PageText>
        <h2>Se vad vi har att erbjuda</h2>
        <p>
          Här hittar du ett urval av vad vi har att erbjuda. I menyn finns våra
          omtyckta pizzor, varmrätter såsom klassiska Filé Oscar eller varför
          inte testa våra pastor?
        </p>
        <p>Man hittar något för alla tillfällen, välkomna in på en bit!</p>
      </PageText>
      <Categories categories={categories} filterItems={filterItems} />
      <MenuList key={categoryId} items={menuItems} />
    </Page>
  );
};

const Page = styled.main`
  min-height: ${({ theme }) => theme.page.minHeight};
  width: 90vw;
  max-width: 990px;
  margin: 0 auto;
`;

const PageText = styled.div``;

export default Menu;
