import * as React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';

export default function Home() {
  return (
    <Layout>
      <Page>
        <Hero />
        <About />
        {/* <Services /> */}
      </Page>
    </Layout>
  );
}

const Page = styled.main`
  width: 90vw;
  margin: 0 auto;
  max-width: 1120px;
`;
