import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';

const Menu = () => {
  return (
    <Layout>
      <Page className='page'>
        <h2>Menu page</h2>
      </Page>
    </Layout>
  );
};

const Page = styled.main`
  min-height: ${({ theme }) => theme.page.minHeight};
`;

export default Menu;
