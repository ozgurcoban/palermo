import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';

const About = () => {
  return (
    <Layout>
      <Page>
        <PageHeader>
          <PageHeaderCenter>
            <h2>om palermo</h2>
          </PageHeaderCenter>
        </PageHeader>
        <PageContent>
          <h3>Historien om den där Palermo</h3>
          <p>
            Välkommen till Restaurang Palermo i Uppsala, en trivsam och
            välkomnande restaurang med passionerad personal. Vi erbjuder en
            mängd olika rätter, från pastarätter och pizza till grillade
            specialiteter, samt en uppskattad dryckesmeny.
          </p>
          <p>
            Vår restaurang har en kvarterkrogskänsla och en härlig blandning av
            gäster, inklusive knegare, vinsmuttande damer och herrar och
            studenter.
          </p>
          <p>
            Vid behov kan du också sitta i vår intima källare som även går att
            abonera för större sällskap. Det finns en uteservering som är
            inglasad och isolerad som håller gäster svala sommartid och varma
            under vintern. Vid större sportevenemang visar vi även
            storbildsvisning.
          </p>
        </PageContent>
      </Page>
    </Layout>
  );
};

const Page = styled.main`
  min-height: 100vh;
`;

const PageHeader = styled.section`
  height: 20vh;
  background: hsla(300, 2%, 56%, 1);
  display: grid;
  place-items: center;
  margin-bottom: 2rem;
  h2 {
    color: ${({ theme }) => theme.primaryLight};
  }

  background: linear-gradient(
    315deg,
    hsla(300, 2%, 56%, 1) 0%,
    hsla(300, 2%, 33%, 1) 100%
  );

  background: -moz-linear-gradient(
    315deg,
    hsla(300, 2%, 56%, 1) 0%,
    hsla(300, 2%, 33%, 1) 100%
  );

  background: -webkit-linear-gradient(
    315deg,
    hsla(300, 2%, 56%, 1) 0%,
    hsla(300, 2%, 33%, 1) 100%
  );

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#DACABE", endColorstr="#684F3C", GradientType=1 );
`;

const PageHeaderCenter = styled.div`
  width: 90vw;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PageContent = styled.div`
  width: 90vw;
  margin: 0 auto;
`;

export default About;
