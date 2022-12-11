import React, { useState, useRef } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

import { GlobalStyles } from '../styles/global';
import Theme from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import Burger from './Navbar/Burger';
import SideMenu from './Navbar/SideMenu';

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={Theme}>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <SideMenu open={open} setOpen={setOpen} />
        </div>
        <Navbar />
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
