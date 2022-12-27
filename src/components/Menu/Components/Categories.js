import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Categories = ({ categories, filterItems }) => {
  const [activeCategory, setActiveCategory] = useState('pizza');
  return (
    <ButtonContainer>
      <ButtonWrapper>
        {categories.map((category, index) => {
          return (
            <FilterButton
              type='button'
              key={index}
              onClick={() => {
                setActiveCategory(category);
                filterItems(category);
              }}
              active={category === activeCategory}
              className={category === activeCategory ? 'active' : ''}
            >
              {category}
            </FilterButton>
          );
        })}
      </ButtonWrapper>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.nav`
  border-radius: 0.2rem;
  margin: 1rem auto;
  max-width: 400px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const FilterButton = styled.button`
  background: transparent;
  border-color: transparent;
  text-transform: capitalize;
  position: relative;
  cursor: pointer;
  font-weight: 500;
  padding: 3px;
  font-size: 1.02rem;
  ${({ active }) =>
    active
      ? css`
          color: ;
          /* padding: 0.5rem; */
          font-weight: 600;
          &:after {
            display: block;
            content: '';
            width: 70%;
            height: 2px;
            background: #b3c3d1;
            box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.6);
            -webkit-box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.6);
            -moz-box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.6);
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `
      : css`
          color: ##ebebeb;
        `};

  .active {
    color: red;
  }
`;

export default Categories;
