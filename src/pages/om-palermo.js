import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

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
          <h3>
            Upplev en kvarterkrogskänsla på Restaurang Palermo i Uppsala - med
            en härlig blandning av gäster och rätter för alla smaker
          </h3>
          <ColumnRow>
            <Column1>
              <StaticImage
                alt='crowded bar'
                src='../assets/images/busy-bar.jpg'
                className='img'
                placeholder='blurred'
              />
              <article>
                <p>
                  Välkommen till Restaurang Palermo i Uppsala, en trivsam och
                  välkomnande restaurang med passionerad personal. Vi erbjuder
                  en mängd olika rätter, från pastarätter och pizza till
                  grillade specialiteter, samt en uppskattad dryckesmeny.
                </p>
                <p>
                  Vår restaurang har en kvarterkrogskänsla och en härlig
                  blandning av gäster, inklusive knegare, vinsmuttande damer och
                  herrar samt alla dessa underbara studenter.
                </p>
                <p>
                  Vid behov kan du också sitta i vår intima källare som även går
                  att abonera för större sällskap. Det finns en uteservering som
                  är inglasad och isolerad som håller gäster svala sommartid och
                  varma under vintern. Vid större sportevenemang visar vi även
                  storbildsvisning.
                </p>
              </article>
            </Column1>
            <Column2>
              <StaticImage
                alt='interior of Palermo'
                src='../assets/images/indoor.jpg'
                className='img'
                placeholder='blurred'
              />
              {/* <StaticImage
                alt='dinner table'
                src='../assets/images/dinner-table.jpg'
                className='img'
                placeholder='blurred'
              /> */}
              <div>
                <h4>På Palermo</h4>
                <ul>
                  <li>Boka festvåning för större sällskap</li>
                  <li>Happy hour varje dag 15-22</li>
                </ul>
              </div>
              <div>
                <h4>Kom i kontakt</h4>
                <OutboundLink
                  href='http://maps.google.com/?q=Palermo Sysslomansgatan 7, 753 11 Uppsala'
                  target='_blank'
                >
                  Sysslomansgatan 7 <br /> 753 11 Uppsala
                  <ul>
                    <li>
                      <OutboundLink href='tel:018131820'>
                        018-131820
                      </OutboundLink>
                    </li>
                    <li>
                      <OutboundLink href='mailto:info@palermo-uppsala.se'>
                        info@palermo-uppsala.se
                      </OutboundLink>
                    </li>
                  </ul>
                </OutboundLink>
              </div>
              <StaticImage
                alt='pizza'
                src='../assets/images/pizza.jpg'
                className='img'
                placeholder='blurred'
              />
              {/* <StaticImage
                alt='people cheering with wine glasses'
                src='../assets/images/cheering.jpg'
                className='img'
                placeholder='blurred'
              /> */}
            </Column2>
          </ColumnRow>
          {/* <ColumnRow>
            <h3>Lorem, ipsum.</h3>
            <ContactWrapper>
              <div>
                <h4>hitta hit</h4>

                <a
                  href='http://maps.google.com/?q=Palermo Sysslomansgatan 7, 753 11 Uppsala'
                  target='_blank'
                >
                  Sysslomansgatan 7 <br /> 753 11 Uppsala
                  <h4>kontakta oss</h4>
                  <ul>
                    <li>
                      <a href='tel:018131820'>018-131820</a>
                    </li>
                    <li>
                      <a href='mailto:info@palermo-uppsala.se'>
                        info@palermo-uppsala.se
                      </a>
                    </li>
                  </ul>
                </a>
              </div>
              <div>
                <h4>På Palermo</h4>
                <ul>
                  <li>Boka festvåning för större sällskap</li>
                  <li>Happy hour varje dag 15-22</li>
                </ul>
              </div>
              <StaticImage
                alt='bar with guests'
                src='../assets/images/gray-bar.jpg'
                className='bar-img'
                placeholder='blurred'
              />
            </ContactWrapper>
          </ColumnRow> */}
        </PageContent>
      </Page>
    </Layout>
  );
};

const Page = styled.main`
  .img {
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;

    &:first-of-type {
      margin-bottom: 1rem;
    }
  }

  /* .bar-img {
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    grid-column: span 2;
  } */

  h3 {
    margin-bottom: 2rem;
    max-width: 45ch;
  }

  h4 {
    margin-top: 0;
  }
`;

const PageHeader = styled.section`
  height: 40vh;
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
  margin: 2.5rem auto;
  max-width: 1120px;

  h3 {
    /* width: clamp(20ch, 50%, 45ch); */
  }
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
  grid-gap: 2rem 2rem;
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

export const Head = () => {
  return (
    <>
      <title>Om Palermo</title>
    </>
  );
};
