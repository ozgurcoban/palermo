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
            <Column2></Column2>
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

const ColumnRow = styled.div``;

const Column1 = styled.div``;

const Column2 = styled.article``;

export default Contact;
