import styled from 'styled-components';

export const StyledSideMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: ${({ theme }) => theme.primaryLight};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: ${open => (open ? 'hidden' : '')};
  transition: ${({ theme }) => theme.animations.transition};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    width: 70vw;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (min-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
