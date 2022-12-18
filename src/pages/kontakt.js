import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Hero from '../components/Hero';

const Contact = () => {
  return (
    <Layout>
      <Page>
        <Hero />
        <h2>Contact Page</h2>
      </Page>
    </Layout>
  );
};

const Page = styled.main`
  min-height: ${({ theme }) => theme.page.minHeight};
  width: 90vw;
  margin: 0 auto;
`;

export default Contact;
