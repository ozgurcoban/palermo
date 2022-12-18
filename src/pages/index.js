import * as React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Hero from '../components/Hero';
import About from '../components/About';

export default function Home() {
  return (
    <Layout>
      <Page>
        <Hero />
        <About />
      </Page>
    </Layout>
  );
}

const Page = styled.main`
  width: 90vw;
  margin: 0 auto;
`;
