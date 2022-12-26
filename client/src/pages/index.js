import * as React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ContactForm from '../components/Form/ContactForm';

export default function Home() {
  return (
    <Layout>
      <Page>
        <Hero />
        <About />
        {/* <Services /> */}
        {/* <ContactForm /> */}
      </Page>
    </Layout>
  );
}

const Page = styled.main`
  width: 90vw;
  margin: 0 auto;
  max-width: 1120px;
`;

export const Head = () => {
  return (
    <>
      <title>Palermo i Uppsala</title>
      <link
        rel='stylesheet'
        href='https://use.fontawesome.com/releases/v5.7.0/css/all.css'
      />
    </>
  );
};
