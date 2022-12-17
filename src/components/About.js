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
          <P>
            Välkommen till Restaurang Palermo i Uppsala! Vi är stolta över att
            kunna erbjuda en riktigt god matupplevelse i en trivsam och
            avslappnad miljö. Vårt kök team består av passionerade kockar som
            alltid strävar efter att servera de bästa råvarorna och skapa nya,
            spännande rätter.
          </P>
          <P>
            Vår meny innehåller en mängd olika rätter, allt från klassiska
            pastarätter till grillade specialiteter. Vi har också en fantastisk
            vinlista som vi gärna delar med oss av våra gäster.
          </P>
          <P>
            Vi hoppas att du kommer att trivas hos oss på Restaurang Palermo och
            vi ser fram emot att få välkomna dig som gäst!
          </P>
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

const P = styled.p`
  font-weight: 500;
`;

export default About;
