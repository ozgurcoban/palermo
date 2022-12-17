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
          <NavLink>kontakt</NavLink>
          <MenuLink to='/meny'>
            <NavBtn>Meny</NavBtn>
          </MenuLink>
        </NavLinks>
      </NavCenter>
    </Nav>
  );
};

export default Navbar;

// export const Navbar = () => {
//   const [extendNavbar, setExtendNavbar] = useState(false);
//   const [open, setOpen] = useState(false);

//   const toggle = () => {
//     setOpen(!open);
//   };

//   return (
//     <NavbarContainer id='navbar' open={open}>
//       <NavbarInnerContainer>
//         <LeftContainer>
//           <NavbarLinkContainer>
//             <NavbarLink to='/'>start</NavbarLink>
//             <NavbarLink to='/meny'>meny</NavbarLink>
//             {/* <NavbarLink to='/om-palermo'>om oss</NavbarLink>
//             <NavbarLink to='/kontakt'>kontakta oss</NavbarLink> */}

//             <Burger open={open} setOpen={setOpen} />
//           </NavbarLinkContainer>
//         </LeftContainer>
//         <RightContainer>
//           <Logo src={logoImg}></Logo>
//         </RightContainer>
//       </NavbarInnerContainer>
//       {open && (
//         <NavbarExtendedContainer>
//           <NavbarLinkExtended onClick={() => setOpen(!open)} to='/'>
//             start
//           </NavbarLinkExtended>
//           <NavbarLinkExtended onClick={() => setOpen(!open)} to='/meny'>
//             meny
//           </NavbarLinkExtended>
//           {/* <NavbarLinkExtended to='/om-palermo'>om oss</NavbarLinkExtended>
//           <NavbarLinkExtended to='/kontakt'>kontakta oss</NavbarLinkExtended> */}
//         </NavbarExtendedContainer>
//       )}
//     </NavbarContainer>
//   );
// };

// export default Navbar;
