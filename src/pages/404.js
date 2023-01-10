import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';

const Error = () => {
  return (
    <Layout>
      <ErrorContainer>
        <div>
          <h2>404</h2>
          <p>sidan hittades inte...</p>
          <Link to='/'>Tillbaka till förstasidan</Link>
        </div>
      </ErrorContainer>
    </Layout>
  );
};

const ErrorContainer = styled.main`
  font-family: 'Raleway', sans-serif;
  height: 80vh;
  display: grid;
  place-items: center;
  div {
    text-align: center;
  }
  div > h2 {
    font-size: clamp(8rem, 10vw, 8rem);
    margin: 0 0 1rem 0;
  }

  div > p {
    font-size: clamp(1.8rem, 3vw, 3rem);
    margin: 0 0 2rem 0;
  }

  div > a {
    padding-top: 2rem;
    text-transform: uppercase;
    text-decoration: underline;
    font-size: clamp(1.1rem, 2vw, 1.7rem);
    font-weight: 600;
  }
`;

export default Error;
