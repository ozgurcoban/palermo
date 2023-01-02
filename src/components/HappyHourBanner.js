import React from 'react';
import styled from 'styled-components';
import {
  ParallaxBanner,
  ParallaxBannerLayer,
  ParallaxProvider,
} from 'react-scroll-parallax';
import { StaticImage } from 'gatsby-plugin-image';

const HappyHourBanner = () => {
  return (
    <ParallaxContainer>
      <ParallaxProvider>
        <ParallaxBanner className='parallax-banner'>
          <ParallaxBannerLayer speed={12}>
            <StaticImage
              className='bg-img'
              src='../assets/images/three-chairs.jpg'
              placeholder='blurred'
              layout='fullWidth'
              alt='three bar stools'
            />
          </ParallaxBannerLayer>
          <ParallaxBannerLayer
            opacity={[0, 1]}
            scale={[0.7, 1.1]}
            className='parallax-banner-layer'
            speed={8}
          >
            <h2>Happy hour varje dag kl 15-22</h2>
          </ParallaxBannerLayer>
        </ParallaxBanner>
      </ParallaxProvider>
    </ParallaxContainer>

    // <ParallaxContainer>
    //   <ParallaxProvider>
    //     <ParallaxBanner className='parallax-banner'>
    //       <ParallaxBannerLayer speed={-15}>
    //         <StaticImage
    //           className='bg-img'
    //           src='../assets/images/three-chairs.jpg'
    //           placeholder='blurred'
    //           layout='fullWidth'
    //           alt='three bar stools'
    //         />
    //         <ParallaxBannerLayer className='parallax-banner-layer' speed={-5}>
    //           <h2>Happy hour varje dag kl 15-22</h2>
    //         </ParallaxBannerLayer>
    //       </ParallaxBannerLayer>
    //     </ParallaxBanner>
    //   </ParallaxProvider>
    // </ParallaxContainer>
  );
};

const ParallaxContainer = styled.div`
  height: 40vh;
  margin: 10rem 0;

  .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  h2 {
    color: ${({ theme }) => theme.primaryLight};
    padding: 1rem;
    max-width: 14ch;
    font-weight: 400;
  }

  .parallax-banner {
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
    position: relative;
  }

  .parallax-banner-layer {
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.4);
  }
`;

export default HappyHourBanner;
