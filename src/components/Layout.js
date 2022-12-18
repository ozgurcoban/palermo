import React, { useState, useRef } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

import { GlobalStyles } from '../styles/global';
import Theme from '../styles/theme';
import { ThemeProvider } from 'styled-components';

const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Navbar />
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
