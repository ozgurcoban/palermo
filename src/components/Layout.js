import React, { useState, useRef } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Burger from './Navbar/Burger';
import SideMenu from './Navbar/SideMenu';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

import { GlobalStyles } from '../styles/global';
import Theme from '../styles/theme';
import { ThemeProvider } from 'styled-components';

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <SideMenu open={open} setOpen={setOpen} />
          <Navbar />
        </div>
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
