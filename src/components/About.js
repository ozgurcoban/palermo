import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

const About = () => {
  return (
    <AboutContainer>
      <Headline>om palermo</Headline>
      <AboutWrapper>
        <article>
          <div>
            <Tagline>
              Upplev avslappnad atmosfär och smakfull mat på Restaurang Palermo
            </Tagline>
            <P>
              Välkommen till restaurang Palermo i Uppsala! Vi serverar god mat i
              en trivsam miljö och har en meny full av olika rätter; allt ifrån
              pastarätter, sallader och pizza, till klassiska kötträtter. Vår
              dryckeslista är också väl värd att upptäcka.
            </P>
            <P>Vi ser fram emot att få välkomna dig som gäst!</P>
          </div>
          <div>
            <h3>Öppettider</h3>
            <Table style={{ width: '100%' }}>
              <tr>
                <td>Måndag</td>
                <td>13:00 - 01:00</td>
              </tr>
              <tr>
                <td>Tisdag - Lördag</td>
                <td>11:00 - 03:00</td>
              </tr>
              <tr>
                <td>Söndag</td>
                <td>12:00 - 01:00</td>
              </tr>
            </Table>
          </div>
          <Link to='/meny' className='btn'>
            till menyn
          </Link>
        </article>
        <StaticImage
          src='../assets/images/glasses.jpg'
          alt='Person Pouring Salt in Bowl'
          className='about-img'
          placeholder='blurred'
        />
      </AboutWrapper>
    </AboutContainer>
  );
};

const AboutContainer = styled.section`
  .about-img {
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  .btn {
    background-color: #7491aa;
    color: aliceblue;
  }

  article {
    order: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const AboutWrapper = styled.div`
  display: grid;
  gap: 2rem 4rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Headline = styled.h2`
  text-align: center;

  text-transform: uppercase;
`;
const Tagline = styled.h3``;

const P = styled.p`
  font-weight: 500;
`;

const Table = styled.table`
  width: 100%;
  max-width: 20rem;
  margin-bottom: 2rem;
`;

export default About;
