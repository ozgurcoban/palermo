import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <Layout>
      <Page>
        <PageHeader>
          <PageHeaderCenter>
            <h2>kontakta oss</h2>
          </PageHeaderCenter>
        </PageHeader>
        <PageContent>
          <ColumnRow>
            <Column1>
              <ContactForm />
            </Column1>
            <Column2>
              <h3>Vi vill gärna höra från dig!</h3>
              <p>
                Om du har några frågor, förslag eller feedback är du varmt
                välkommen att kontakta oss. Vi på Palermo i Uppsala ser fram
                emot att höra från dig och göra vårt yttersta för att du ska få
                en minnesvärd kväll hos oss.
              </p>
              <p>
                Vänligen använd formuläret nedan för att skicka oss ett
                meddelande eller ring oss på det angivna telefonnumret. Vi
                återkommer så snart som möjligt.
              </p>
            </Column2>
          </ColumnRow>
        </PageContent>
      </Page>
    </Layout>
  );
};

const Page = styled.main`
  min-height: ${({ theme }) => theme.page.minHeight};
`;

const PageHeader = styled.section`
  height: 30vh;
  background: hsla(300, 2%, 56%, 1);
  display: grid;
  place-items: center;
  /* margin-bottom: 4rem; */

  h2 {
    color: ${({ theme }) => theme.primaryLight};
  }

  background: linear-gradient(
    315deg,
    hsla(300, 2%, 56%, 1) 0%,
    hsla(300, 2%, 33%, 1) 100%
  );

  background: -moz-linear-gradient(
    315deg,
    hsla(300, 2%, 56%, 1) 0%,
    hsla(300, 2%, 33%, 1) 100%
  );

  background: -webkit-linear-gradient(
    315deg,
    hsla(300, 2%, 56%, 1) 0%,
    hsla(300, 2%, 33%, 1) 100%
  );

  /* filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#DACABE", endColorstr="#684F3C", GradientType=1 ); */
`;

const PageHeaderCenter = styled.div`
  width: 90vw;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 1120px;
`;

const PageContent = styled.div`
  width: 90vw;
  margin: 3rem auto;
  max-width: 1120px;
`;

const ColumnRow = styled.div`
  display: grid;
  grid-gap: 2rem 4rem;
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.sizes.tablet}) {
    width: 50%;
  }
`;

const Column1 = styled.div`
  order: 1;
`;

const Column2 = styled.article``;

export default Contact;

export function Head() {
  return <title>Kontakta oss</title>;
}
