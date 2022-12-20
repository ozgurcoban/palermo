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
          <ColumnRow>
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
                    blandning av gäster, inklusive knegare, vinsmuttande damer
                    och herrar och studenter.
                  </p>
                  <p>
                    Vid behov kan du också sitta i vår intima källare som även
                    går att abonera för större sällskap. Det finns en
                    uteservering som är inglasad och isolerad som håller gäster
                    svala sommartid och varma under vintern. Vid större
                    sportevenemang visar vi även storbildsvisning.
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
          </ColumnRow>
          <ContactWrapper>
            <div>
              <h4>hitta till oss</h4>
              <a
                href='http://maps.google.com/?q=Palermo Sysslomansgatan 7, 753 11 Uppsala'
                target='_blank'
              >
                Sysslomansgatan 7 <br /> 753 11 Uppsala
              </a>
            </div>
            <ul>
              <h4>På Palermo</h4>
              <li>Boka festvåning för större sällskap</li>
              <li>Happy hour varje dag 15-22</li>
            </ul>
            <StaticImage
              alt='bar with guests'
              src='../assets/images/gray-bar.jpg'
              className='bar-img'
              placeholder='blurred'
            />
          </ContactWrapper>
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

  .bar-img {
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    grid-column: span 2;
  }
`;

const PageHeader = styled.section`
  height: 30vh;
  background: hsla(300, 2%, 56%, 1);
  display: grid;
  place-items: center;

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

  /* filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#DACABE", endColorstr="#684F3C", GradientType=1 ); */
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
  margin: 4rem auto;
  max-width: 1120px;
`;

const ColumnRow = styled.div`
  display: grid;
  gap: 2rem 4rem;
  margin-bottom: 5rem;

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
    /* padding: 1rem; */
  }
`;

const ContactWrapper = styled.div`
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem 4rem;
  align-items: start;
  border-radius: ${({ theme }) => theme.borderRadius};

  ul {
    margin: 0;
    text-decoration: dotted;
  }

  @media (min-width: 768px) {
    div,
    ul,
    .bar-img {
      grid-column: 2;
    }
  }
`;

export default About;
