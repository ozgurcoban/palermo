import React from 'react';
import { Link } from 'gatsby';
import {
  StyledNavbar,
  NavCenter,
  NavHeader,
  NavLinks,
  MenuButton,
  Logo,
} from './NavbarElements';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
  return (
    <StyledNavbar>
      <NavCenter>
        <NavHeader>
          <Logo src={logo} alt='palermo'></Logo>
        </NavHeader>
        <NavLinks className='links'>
          <Link to='/'>start</Link>
          <Link to='/meny'>meny</Link>
          <Link to='/om-palermo'>om palermo</Link>
          <Link to='/kontakt'>kontakta oss</Link>
        </NavLinks>
        <MenuButton>se meny</MenuButton>
      </NavCenter>
    </StyledNavbar>
  );
};

export default Navbar;
