import styled from 'styled-components';
import { Link } from 'gatsby';

export const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  height: ${({ open }) => (open ? '40vh' : '80px')};
  transition: ${({ theme }) => theme.animations.transition};
  margin: 0 auto 1rem auto;
  width: 90vw;
  max-width: 1120px;

  /* @media (min-width: 700px) {
    height: 80px;
  } */
`;

export const NavbarInnerContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RightContainer = styled.div`
  /* flex: 30%; */

  /* justify-content: flex-end; */
  /* padding-right: 50px;
  display: block; */

  position: relative;
  top: 10px;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled(Link)`
  /* color: white; */
  font-size: x-large;
  text-decoration: none;
  margin: 10px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  font-size: x-large;
  text-decoration: none;
  margin: 10px;
`;

// export const Logo = styled.img`
//   /* margin: 10px; */
//   height: auto;
//   width: 4rem;
// `;

export const OpenLinkButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 3rem;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: antiquewhite;
  height: 30rem;

  @media (min-width: 992px) {
    display: none;
  }
`;

// export const OpenLinkButton = styled.button`
//   width: 70px;
//   height: 50px;
//   background: none;
//   border: none;
//   font-size: 3rem;

//   @media (min-width: 700px) {
//     display: none;
//   }
// `;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 992px) {
    height: 6rem;
  }
`;

export const NavCenter = styled.div`
  width: 90vw;
  max-width: 1120px;

  @media (min-width: 992px) {
    display: flex;
    align-items: center;
    height: 6rem;
  }
`;

export const NavHeader = styled.div`
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 992px) {
    padding: 0;
    margin-right: 2rem;
    height: auto;
  }
`;

export const Logo = styled.img`
  margin-left: -6px;
  margin-bottom: -9px;
  width: 5rem;
`;

export const NavBtn = styled.button`
  padding: 0.15rem 0.75rem;
  font-size: 1.5rem;
  align-self: center;

  @media (min-width: 992px) {
    /* display: none; */
  }
`;

export const NavLinks = styled.div`
  height: ${({ open }) => (open ? '15rem' : '0')};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: ${({ theme }) => theme.animations.transition};

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: auto;
  }
`;

export const NavLink = styled(Link)`
  display: block;
  text-align: center;
  color: #333;
  padding: 1rem 0;
  white-space: nowrap;
  font-size: 1.5rem;
  text-transform: capitalize;
  letter-spacing: ${({ theme }) => theme.letterSpacing};
  transition: ${({ theme }) => theme.animations.transition};

  @media (min-width: 992px) {
    padding: 0;
    border-top: none;
    margin-right: 1rem;
    font-size: 1rem;
  }
`;

export const MenuLink = styled(NavLink)`
  display: flex;
  justify-content: center;

  @media (min-width: 992px) {
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    margin-right: 0;
  }
`;
