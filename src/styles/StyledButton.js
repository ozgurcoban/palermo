import styled from 'styled-components';

const Button = styled.Button`
  background-color: #455d73;
  padding: 0.7rem 1rem;
  font-size: clamp(1rem, 5vw, 1.1rem);
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 300;
`;
