import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Error = () => {
  return (
    <ErrorContainer>
      <div>
        <h2>404</h2>
        <p>sidan hittades inte...</p>
        <Link to='/'>Tillbaka till förstasidan</Link>
      </div>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.main`
  font-family: 'Raleway', sans-serif;
  height: 80vh;
  div {
    display: grid;
    place-items: center;
  }
  div > h2 {
    font-size: clamp(2rem, 3vw, 4rem);
  }

  div > p {
    font-size: clamp(1.2rem, 2vw, 1.8rem);
  }

  div > a {
    text-transform: uppercase;
    font-size: clamp(1.2 rem, 2vw, 1.7);
    font-weight: 600;
  }
`;

export default Error;
