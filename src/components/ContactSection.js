import React from 'react';
import ContactForm from './ContactForm';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import styled from 'styled-components';

const ContactSection = () => {
  return (
    <ContactContainer>
      <article>
        <h3>Kontakta oss</h3>
        <p>
          Om du har några frågor eller kommentarer, tveka inte att kontakta oss.
          Du kan nå oss genom att fylla i formuläret nedan eller genom att
          skicka ett mejl till&nbsp;
          <OutboundLink href='mailto:info@palermo-uppsala.se'>
            <strong>info@palermo-uppsala.se</strong>
          </OutboundLink>
          &nbsp;eller ringa&nbsp;
          <OutboundLink href='tel:018131820'>
            <strong>018-131820</strong>
          </OutboundLink>
          . Vi ser fram emot att höra från dig!
        </p>
      </article>
      <ContactForm />
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem 4rem;
  padding-top: 6rem;
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.sizes.laptop}) {
    width: 50%;
  }
`;

export default ContactSection;
