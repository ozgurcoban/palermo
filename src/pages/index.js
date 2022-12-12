import * as React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';

export default function Home() {
  return (
    <Layout>
      <Page>
        <h2>home</h2>
      </Page>
    </Layout>
  );
}

const Page = styled.main`
  min-height: ${({ theme }) => theme.page.minHeigh};
`;
