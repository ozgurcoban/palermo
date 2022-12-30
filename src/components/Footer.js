import React from 'react';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        {/* <Logo>Miklagård</Logo> */}
        <FooterContactWrapper>
          <FooterContactItems>
            <SocialMedia>
              <SocialMediaWrap>
                <Headline>följ oss</Headline>
                <SocialIcons>
                  <SocialIconLink
                    href='https://www.facebook.com/profile.php?id=100046443356150'
                    target='_blank'
                    aria-label='Facebook'
                  >
                    <FaFacebook />
                  </SocialIconLink>
                  <SocialIconLink
                    href='https://www.instagram.com/palermo_uppsala'
                    target='_blank'
                    aria-label='Instagram'
                  >
                    <FaInstagram />
                  </SocialIconLink>
                </SocialIcons>
              </SocialMediaWrap>
            </SocialMedia>
            <Adress>
              <Headline>hitta oss</Headline>
              <OutboundLink
                href='http://maps.google.com/?q=Palermo Sysslomansgatan 7, 753 11 Uppsala'
                target='_blank'
              >
                Sysslomansgatan 7 <br /> 753 11 Uppsala
              </OutboundLink>
            </Adress>
            <Adress>
              <Headline>kontakta oss</Headline>
              <ContactItem href='tel:018-018-131820'>
                018 - 131820 <br />
              </ContactItem>
              <ContactItem href='mailto:info@palermo-uppsala.se'>
                info@palermo-uppsala.se
              </ContactItem>
            </Adress>
            <FooterLinksItems>
              <Headline>navigering</Headline>
              <li>
                <FooterLink to='/'>start</FooterLink>
              </li>
              <li>
                <FooterLink to='/om-palermo'>om palermo</FooterLink>
              </li>
              <li>
                <FooterLink to='/kontakt'>kontakta oss</FooterLink>
              </li>
            </FooterLinksItems>
          </FooterContactItems>
          <FooterLinksWrapper></FooterLinksWrapper>
        </FooterContactWrapper>
      </FooterWrapper>
      <WebsiteRightWrapper>
        <WebsiteRights>
          © Palermo, Uppsala.&nbsp;{new Date().getFullYear()}&nbsp;
          <P>
            Powered by
            <OutboundLink href='https://www.gatsbyjs.com/' target='_blank'>
              &nbsp;Gatsby
            </OutboundLink>
          </P>
        </WebsiteRights>
      </WebsiteRightWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #1f2933;
  color: ${({ theme }) => theme.primaryLight};
  margin-top: 4rem;
`;

const FooterWrapper = styled.div`
  padding: 3rem;
  max-width: 1120px;
  margin: 0 auto;
  /* @media screen and (min-width: 768px) {
    flex-direction: row;
  } */
`;

/* FIXME: create a global font-style: normal */

const Adress = styled.address`
  font-style: normal;
  align-self: start;
  margin: 0.3rem;

  a {
    cursor: pointer;
    color: ${({ theme }) => theme.primaryLight};
  }
`;

const Headline = styled.h5`
  text-transform: uppercase;
  white-space: nowrap;
`;

const ContactItem = styled(OutboundLink)`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primaryLight};
`;

const FooterContactWrapper = styled.div`
  width: 100%;
  line-height: 1.5rem;
`;

const FooterContactItems = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(232px, 1fr));
  grid-gap: 1rem;
  @media (min-width: 992px) {
    justify-items: center;
  }
`;

const FooterLinksWrapper = styled.div``;

const FooterLinksItems = styled.ul`
  margin: 0.3rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.primaryLight};
  text-transform: capitalize;
`;

const SocialMedia = styled.div`
  margin: 0.3rem;
  align-self: start;
`;

const SocialMediaWrap = styled.div`
  max-width: 3.4rem;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  @media screen and (min-width: 584px) {
    flex-direction: column;
    align-items: flex-start;
  }
  /* width: 240px; */
`;

const SocialIconLink = styled(OutboundLink)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primaryLight};
  transition: all 0.3s ease-in-out;
  &:hover {
    transition: all 0.3s ease-in-out;
    transform: scale(1.1);
  }
`;

const WebsiteRightWrapper = styled.div`
  display: flex;
`;

const WebsiteRights = styled.small`
  color: ${({ theme }) => theme.primaryLight};
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

const P = styled.p`
  background-color: lightGray;
  margin-bottom: 0;
  font-size: 8px;
  font-weight: 300;
  padding: 0.1rem 0;
  color: ${({ theme }) => theme.primaryDark};

  a {
    font-weight: bold;
    color: #7026b9;
  }
`;

export default Footer;
