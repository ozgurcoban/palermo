import styled from 'styled-components';

export const MenuItem = styled.div`
  /* padding: 1rem; */
  background-color: lightGray;
  border-radius: ${({ theme }) => theme.borderRadius};
  max-width: 990px;
  margin: 0 auto;
`;

export const SubCategory = styled.h3`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.7rem;
  margin-bottom: 1rem;
`;

export const ItemWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
`;

export const Item = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: #f4f4f4;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;
  align-items: start;
`;

export const CategoryDesc = styled.p`
  &:first-letter {
    text-transform: uppercase;
  }
`;

export const Name = styled.h4`
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
  font-size: 1em;
  font-weight: 500;
  max-width: 16ch;
  /* &:first-letter {
    text-transform: uppercase;
    font-size: 1.7em;
    font-weight: 500;
  } */
`;

export const Price = styled.p`
  text-transform: capitalize;
  margin: 0;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const TakeAwayPrice = styled.p``;

export const Description = styled.p`
  &:first-letter {
    text-transform: capitalize;
  }
  width: clamp(30ch, 50%, 55ch);
  line-height: 1.8em;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  line-height: 1.1em;
`;
