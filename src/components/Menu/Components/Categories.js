import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Categories = ({ categories, filterItems }) => {
  return (
    <ButtonContainer>
      <ButtonWrapper>
        {categories.map((category, index) => {
          return (
            <FilterButton
              type='button'
              key={index}
              onClick={() => filterItems(category)}
            >
              {category}
            </FilterButton>
          );
        })}
      </ButtonWrapper>
    </ButtonContainer>
  );
};

export const ButtonContainer = styled.nav`
  border-radius: 0.2rem;
  background-color: #c3c1c3;
  border: 2px solid #686468;
  box-shadow: 0px 1px 3px gray inset;
  /* border: 1px solid #49a6ab; */
  /* @media screen and (min-width: 440px) {
    display: flex;
    justify-content: center;
  } */
  /* display: flex;
  justify-content: center; */
  margin: 3rem auto 0 auto;
  max-width: 400px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

export const FilterButton = styled.button`
  /*  */
  background: transparent;
  border-color: transparent;
  text-transform: capitalize;
  cursor: pointer;
  font-weight: 500;
  color: #030301;
  padding: 0 2px 0 2px;
  font-size: 1.02rem;
  color: #f4f4f4;
  /* color: ${({ active }) =>
    active &&
    css`
      color: red;
    `}; */
`;

export default Categories;
