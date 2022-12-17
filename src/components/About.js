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
            Valkommen till restaurang palermo i uppsala! Vi serverar god mat i
            en trivsam miljo och har en meny full av olika ratter, fran
            pastaratter, pizza och till klassiska specialiteter. Var
            dryckeslista ar ocksa val vard att upptacka. Vi ser fram emot att fa
            valkomna dig som gast!
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
          height={1000}
          width={1000}
        />
      </AboutWrapper>
    </AboutContainer>
  );
};

const AboutContainer = styled.section`
  .about-img {
    border-radius: ${({ theme }) => theme.borderRadius};
    height: 500px;
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
