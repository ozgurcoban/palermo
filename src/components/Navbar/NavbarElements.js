import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  margin-top: 3rem;

  @media (min-width: ${({ theme }) => theme.sizes.laptop}) {
    display: flex;
  }
`;

export const NavCenter = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavHeader = styled.div`
  margin-right: 2rem;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLinks = styled.div`
  display: flex;
  width: 100%;

  transition: ${({ theme }) => theme.animations.transition};

  a {
    margin-right: 1.5rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.primaryDark};
    font-weight: thin;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }
`;

export const MenuButton = styled.button`
  padding: 1rem 3rem;
  cursor: pointer;
  appearance: none;
  border-radius: 0.5rem;
  border: none;
  white-space: nowrap;
`;

export const Logo = styled.img`
  width: 30%;
  padding-top: 4rem;
`;
