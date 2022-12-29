import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { Typewriter } from 'react-simple-typewriter';

const About = () => {
  return (
    <AboutContainer>
      <Headline>
        Sammanträffa med vänner och njut av&nbsp;
        <span>
          <Typewriter
            words={['god mat', 'läskande dryck', 'härlig stämning']}
            loop={false}
            cursor
            cursorStyle='_'
            typeSpeed={200}
            deleteSpeed={200}
            delaySpeed={2500}
          />
        </span>
        &nbsp;på Restaurang Palermo
      </Headline>
      <AboutWrapper>
        <article>
          <AboutText>
            <Tagline>
              Ta ett avbrott från vardagen och upplev avslappnad atmosfär
            </Tagline>
            <P>
              Välkommen till Restaurang Palermo i Uppsala! Vi serverar god mat i
              en trivsam miljö och har en meny full av olika rätter; allt ifrån
              pastarätter, sallader och pizza, till klassiska kötträtter. Vår
              dryckeslista är också väl värd att upptäcka.
            </P>
            <P>Vi ser fram emot att få välkomna dig som gäst!</P>
          </AboutText>
          <div>
            <h3>Öppettider</h3>
            <Table style={{ width: '100%' }}>
              <tr>
                <td>Måndag - Torsdag</td>
                <td>11:00 - 02:00</td>
              </tr>
              <tr>
                <td>Fredag</td>
                <td>11:00 - 03:00</td>
              </tr>
              <tr>
                <td>Lördag</td>
                <td>12:00 - 03:00</td>
              </tr>
              <tr>
                <td>Söndag</td>
                <td>12:00 - 02:00</td>
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
    display: grid;
    order: 1;
  }

  .link {
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: underline;
  }
`;

const AboutText = styled.div`
  margin-bottom: 3rem;
`;

const AboutWrapper = styled.div`
  display: grid;
  gap: 2rem 4rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Headline = styled.h2`
  min-height: 23rem;
  /* margin-bottom: 2rem; */
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
