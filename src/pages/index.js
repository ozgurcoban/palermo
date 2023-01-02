import * as React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import HappyHourBanner from '../components/HappyHourBanner';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <Layout>
      <Page>
        <Hero />
        <About />
        {/* <Services /> */}
        <HappyHourBanner />
        <ContactSection />
      </Page>
    </Layout>
  );
}

const Page = styled.main`
  width: 90vw;
  margin: 0 auto;
  max-width: 1120px;
`;

const TemporaryBanner = styled.div`
  height: 70vh;
  background-color: bisque;
`;

export const Head = () => {
  return (
    <>
      <title>Palermo i Uppsala</title>
      <link
        rel='stylesheet'
        href='https://use.fontawesome.com/releases/v5.7.0/css/all.css'
      />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1'
      ></meta>
    </>
  );
};
