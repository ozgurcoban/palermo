import React, { useState } from 'react';
import logoImg from '../../assets/images/logo.png';
import Burger from './Burger';
import { Link } from 'gatsby';

import {
  Logo,
  Nav,
  NavCenter,
  NavHeader,
  NavBtn,
  NavLinks,
  NavLink,
  MenuLink,
} from './NavbarElements';

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  // const toggle = () => {
  //   setOpen(!open);
  // };

  return (
    <Nav id='navbar' open={open}>
      <NavCenter>
        <NavHeader>
          <Link to='/'>
            <Logo src={logoImg} />
          </Link>
          <Burger open={open} setOpen={setOpen} />
        </NavHeader>
        <NavLinks open={open}>
          <NavLink onClick={() => setOpen(!open)} to='/'>
            start
          </NavLink>
          <NavLink onClick={() => setOpen(!open)} to='/om-palermo'>
            om palermo
          </NavLink>
          <NavLink onClick={() => setOpen(!open)} to='/kontakt'>
            kontakta oss
          </NavLink>
          <MenuLink to='/meny'>
            <NavBtn>meny</NavBtn>
          </MenuLink>
        </NavLinks>
      </NavCenter>
    </Nav>
  );
};

export default Navbar;
