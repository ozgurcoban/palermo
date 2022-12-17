import React from 'react';

import {
  MenuItem,
  SubCategory,
  Item,
  Header,
  Description,
  Name,
  Price,
  TakeAwayPrice,
  CategoryDesc,
  ItemWrapper,
  PriceWrapper,
} from './MenuListElements';

const MenuList = ({ items }) => {
  const id = items.map;
  return (
    <>
      {items.map(menuItem => {
        const {
          subcategory,
          categoryid: id,
          description,
          extras,
          items,
        } = menuItem;

        return (
          <MenuItem key={id}>
            <SubCategory>{subcategory}</SubCategory>
            <CategoryDesc>{description}</CategoryDesc>
            <ItemWrapper>
              {menuItem.items.map(submenu => {
                const { id, name, price, description, takeawayprice } = submenu;
                return (
                  <Item key={id}>
                    <Header>
                      <Name>{name}</Name>
                      <PriceWrapper>
                        <Price>{price}:-</Price>
                        {takeawayprice ? (
                          <TakeAwayPrice>
                            avhämtning {takeawayprice}:-
                          </TakeAwayPrice>
                        ) : null}
                      </PriceWrapper>
                    </Header>
                    <Description>{description}</Description>
                  </Item>
                );
              })}
            </ItemWrapper>
          </MenuItem>
        );
      })}
    </>
  );
};

export default MenuList;

// import React, { useState, useEffect } from 'react';

// const data = {
//   key1: {
//     subkey1: 'value1',
//     subkey2: 'value2',
//   },
//   key2: {
//     subkey1: 'value3',
//     subkey2: 'value4',
//   },
// };

// const MyComponent = () => {
//   const [elements, setElements] = useState([]);

//   useEffect(() => {
//     const filteredElements = data.map((value, key) => {
//       if (value.subkey1 === 'value1') {
//         return <p key={key}>{value.subkey1}</p>;
//       }
//     });

//     setElements(filteredElements);
//   }, []);

//   return <div>{elements}</div>;
// };
