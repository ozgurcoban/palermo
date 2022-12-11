import React from 'react';
import { StyledSideMenu } from './SideMenuElements';
import { Link } from 'gatsby';

const SideMenu = ({ open }) => {
  return (
    <StyledSideMenu open={open}>
      <Link to='/'>start</Link>
      <Link to='/meny'>meny</Link>
      <Link to='/om-palermo'>om palermo</Link>
      <Link to='/kontakt'>kontakta oss</Link>
    </StyledSideMenu>
  );
};

export default SideMenu;
