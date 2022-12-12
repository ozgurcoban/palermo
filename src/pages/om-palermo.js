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
  min-height: ${({ theme }) => theme.page.minHeigh};
`;

export default About;
