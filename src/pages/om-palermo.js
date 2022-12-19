import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

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
          <Column1>
            <h3>Historien om den där Palermo</h3>
            <StaticImage
              alt='crowded bar'
              src='../assets/images/busy-bar.jpg'
              className='img'
              placeholder='blurred'
            />
            <article>
              <div>
                <p>
                  Välkommen till Restaurang Palermo i Uppsala, en trivsam och
                  välkomnande restaurang med passionerad personal. Vi erbjuder
                  en mängd olika rätter, från pastarätter och pizza till
                  grillade specialiteter, samt en uppskattad dryckesmeny.
                </p>
                <p>
                  Vår restaurang har en kvarterkrogskänsla och en härlig
                  blandning av gäster, inklusive knegare, vinsmuttande damer och
                  herrar och studenter.
                </p>
                <p>
                  Vid behov kan du också sitta i vår intima källare som även går
                  att abonera för större sällskap. Det finns en uteservering som
                  är inglasad och isolerad som håller gäster svala sommartid och
                  varma under vintern. Vid större sportevenemang visar vi även
                  storbildsvisning.
                </p>
              </div>
            </article>
          </Column1>
          <Column2>
            <StaticImage
              alt='interior of Palermo'
              src='../assets/images/indoor.jpg'
              className='img'
              placeholder='blurred'
            />
            <StaticImage
              alt='dinner table'
              src='../assets/images/dinner-table.jpg'
              className='img'
              placeholder='blurred'
            />
            <StaticImage
              alt='pizza'
              src='../assets/images/pizza.jpg'
              className='img'
              placeholder='blurred'
            />
            <StaticImage
              alt='people cheering with wine glasses'
              src='../assets/images/cheering.jpg'
              className='img'
              placeholder='blurred'
            />
          </Column2>
        </PageContent>
      </Page>
    </Layout>
  );
};

const Page = styled.main`
  .img {
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
  }
`;

const PageHeader = styled.section`
  height: 20vh;
  background: hsla(300, 2%, 56%, 1);
  display: grid;
  place-items: center;
  margin-bottom: 4rem;

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
  max-width: 1120px;
`;

const PageContent = styled.div`
  width: 90vw;
  margin: 8rem auto;
  max-width: 1120px;

  display: grid;
  gap: 2rem 4rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  article {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Column1 = styled.div``;

const Column2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem 2rem;

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    padding: 1rem;
  }
`;

export default About;
