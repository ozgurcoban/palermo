import styled from 'styled-components';
import { Link } from 'gatsby';

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
  width: 4rem;
`;

export const NavLinks = styled.div`
  height: ${({ open }) => (open ? '20rem' : '0')};
  overflow: hidden;
  display: flex;
  justify-content: center;
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
  cursor: pointer;
  border-top: 1px solid lightGray;
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

export const NavBtn = styled.button`
  padding: 0.7rem 1rem;
  font-size: 1.5rem;
  align-self: center;
  appearance: none;
  border: none;
  cursor: pointer;
  background-color: #7491aa;
  color: aliceblue;
  border-radius: ${({ theme }) => theme.borderRadius};
  @media (min-width: 992px) {
    /* display: none; */
  }
`;
