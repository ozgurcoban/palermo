import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';

const Menu = () => {
  return (
    <Layout>
      <Page>
        <h2>Menu page</h2>
      </Page>
    </Layout>
  );
};

const Page = styled.main`
  min-height: ${({ theme }) => theme.page.minHeigh};
`;

export default Menu;
