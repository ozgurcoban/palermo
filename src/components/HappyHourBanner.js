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
          <div className='bg-layer' />
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
            opacity={[0.1, 1]}
            className='parallax-banner-text'
            speed={8}
          >
            <h2>
              Happy hour varje dag <span>15-22</span>
            </h2>
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
  padding-top: 6rem;

  .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  h2 {
    color: ${({ theme }) => theme.primaryLight};
    padding: 1rem;
    max-width: 12ch;
    font-weight: 700;

    span {
      white-space: nowrap;
    }
  }

  .parallax-banner {
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius};
    position: relative;
  }

  .parallax-banner-text {
    display: grid;
    place-items: center;
    z-index: 2;
  }

  .bg-layer {
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
`;

export default HappyHourBanner;
