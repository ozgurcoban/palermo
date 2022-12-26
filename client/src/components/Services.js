import React from 'react';
import styled from 'styled-components';

const Services = () => {
  return (
    <StyledServices>
      <h3>Services</h3>
      <div>
        <h4>Uteservering året om</h4>
      </div>
      <div>
        <h4>Boka festvåning för större sällskap</h4>
      </div>
      <div>
        <h4>Happy hour varje dag 15-22</h4>
      </div>
    </StyledServices>
  );
};

const StyledServices = styled.div`
  width: 100%;
  background-color: lavender;
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
  place-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export default Services;
