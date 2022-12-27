import React from 'react';
import styled from 'styled-components';

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
            <CategoryWrapper>
              <SubCategory>{subcategory}</SubCategory>
              <CategoryDesc>{description}</CategoryDesc>
            </CategoryWrapper>
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

const Underline = styled.div`
  width: 7rem;
  margin: 0 auto;
  border: 1px solid red;
`;

const MenuItem = styled.div`
  /* padding: 1rem; */
  border-radius: ${({ theme }) => theme.borderRadius};
  /* max-width: 990px; */
  margin: 0 auto;
`;

const CategoryWrapper = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const SubCategory = styled.h3`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.7rem;
  margin-bottom: 1rem;
`;

const ItemWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  grid-gap: 1rem;
  /* width: 90vw; */
  margin: 0 auto;
`;

const Item = styled.article`
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 0.5rem;
  display: flex;
  border-top: 0.1px solid gray;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  &:last-child {
    border-bottom: 0.1px solid gray;
  }

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    min-height: 300px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;
  align-items: start;
`;

const CategoryDesc = styled.p`
  &:first-letter {
    text-transform: uppercase;
  }
`;

const Name = styled.h4`
  font-weight: 100;
  text-transform: uppercase;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  max-width: 16ch;
  /* &:first-letter {
    text-transform: uppercase;
    font-size: 1.7em;
    font-weight: 500;
  } */
`;

const Price = styled.p`
  text-transform: capitalize;
  margin: 0;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TakeAwayPrice = styled.p``;

const Description = styled.p`
  &:first-letter {
    text-transform: capitalize;
  }
  width: clamp(30ch, 50%, 55ch);
  line-height: 1.8em;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  line-height: 1.1em;
`;
