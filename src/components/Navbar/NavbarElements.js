import styled from 'styled-components';
import { Link } from 'gatsby';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 992px) {
    height: 8rem;
  }

  .active-link {
    font-weight: 700;
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
  margin-bottom: -15px;
  width: 5rem;
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
  font-size: clamp(1.1rem, 5vw, 1.4rem);
  font-weight: 300;
  /* display: block; */
  text-align: center;
  color: #333;
  padding: 1rem 1rem;
  white-space: nowrap;
  cursor: pointer;
  border-top: 1px solid lightGray;
  text-transform: capitalize;
  z-index: 1;
  position: relative;

  &:last-child {
    cursor: default;
  }

  &:not(:last-child) {
    @media screen and (min-width: 768px) {
      &:before {
        background: #c3c1c3;
        content: '';
        inset: 0;
        position: absolute;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s ease-in-out;
        z-index: -1;
      }

      &:hover::before {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }

  @media (min-width: 992px) {
    padding: 0;
    border-top: none;
    margin-right: 1rem;
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
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: 2px solid #e74c3c;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: #e74c3c;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  margin: 20px;
  padding: 1.2em 2.8em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;

  border-color: #455d73;
  color: #fff;
  box-shadow: 0 0 40px 40px #455d73 inset, 0 0 0 0 #455d73;
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;

  &:hover {
    box-shadow: 0 0 10px 0 #455d73 inset, 0 0 10px 4px #455d73;
    color: black;
  }
`;
