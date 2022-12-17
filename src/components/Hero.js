import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const Hero = () => {
  return (
    <StyledHero>
      <StaticImage
        src='../assets/images/hero-image.jpg'
        alt='bar'
        className='hero-img'
        placeholder='blurred'
        layout='full-width'
      ></StaticImage>
      <HeroContainer>
        <HeroText>
          <Headline>Palermo</Headline>
          <Tagline>uppsalas naturligaste mötesplats</Tagline>
        </HeroText>
      </HeroContainer>
    </StyledHero>
  );
};

export const StyledHero = styled.header`
  height: 40vh;
  position: relative;
  margin-bottom: 4rem;

  .hero-img {
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

export const HeroContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const HeroText = styled.div`
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */

  /* position: absolute; */
  color: black;
  text-align: center;
`;

export const Headline = styled.h1`
  font-size: 3rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primaryLight};
`;

export const Tagline = styled.h4`
  font-size: 1.3rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryLight};
`;

export default Hero;
