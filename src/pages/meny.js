import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Menu from '../components/Menu/Menu';

const MenuPage = () => {
  return (
    <Layout>
      <Page>
        <PageHeader>
          <PageHeaderCenter>
            <h2>meny</h2>
          </PageHeaderCenter>
        </PageHeader>
        <PageContent>
          <h3>Upptäck vår mat och dryckesmeny</h3>
          <p>
            Ring oss på&nbsp;
            <a href='tel:018-018-131820'>018-131820</a> eller skicka mail
            till&nbsp;
            <a href='mailto:info@palermo-uppsala.se'>info@palermo-uppsala.se</a>
            &nbsp;om du har några frågor eller funderingar.
          </p>
          <Underline />
          <Menu />
        </PageContent>
      </Page>
    </Layout>
  );
};

const Page = styled.main``;

export default MenuPage;

const Underline = styled.div`
  width: 5rem;
  border: 2px solid #afacaf;
  margin: 0 auto;
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

  @media screen and (min-width: 584px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PageContent = styled.div`
  width: 90vw;
  margin: 3rem auto;
  max-width: 1120px;

  p {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.sizes.mobile}) {
    width: 90vw;
  }
`;
