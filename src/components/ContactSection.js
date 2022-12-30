import React from 'react';
import styled from 'styled-components';
import ContactForm from './ContactForm';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

const Contact = () => {
  return (
    <ContactContainer>
      <h3>Kontakta oss</h3>
      <p>
        Om du har några frågor eller kommentarer, tveka inte att kontakta oss.
        Du kan nå oss genom att fylla i formuläret nedan eller genom att skicka
        ett mejl till&nbsp;
        <OutboundLink href='mailto:info@palermo-uppsala.se'>
          info@palermo-uppsala.se
        </OutboundLink>
        . Vi ser fram emot att höra från dig!
      </p>
      <ContactForm />
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  width: 90vw;
  margin: 10rem auto;

  @media screen and (min-width: ${({ theme }) => theme.sizes.tablet}) {
    max-width: 50%;
  }
`;

export default Contact;
