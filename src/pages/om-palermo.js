import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';

const About = () => {
  return (
    <Layout>
      <Page>
        <h2>About Page</h2>
      </Page>
    </Layout>
  );
};

const Page = styled.main`
  min-height: ${({ theme }) => theme.page.minHeight};
  width: 90vw;
  margin: 0 auto;
`;

export default About;
