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
          <Tagline>
            Upplev avslappnad atmosfär och smakfull mat på Restaurang Palermo
          </Tagline>
          <AboutText>
            Välkommen till Restaurang Palermo i Uppsala! Vi serverar god mat i
            en trivsam miljö och har en meny full av olika rätter, från
            pastarätter, pizza och till klassiska specialiteter. Vår
            dryckeslista är också väl värd att upptäcka. Vi ser fram emot att få
            välkomna dig som gäst!
          </AboutText>
          <Link to='/meny' className='btn'>
            till meny
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
    grid-row: ;
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

const AboutText = styled.p`
  font-weight: 300;
  max-width: 30rem;
`;

export default About;
