import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

html, body {
  margin: 0;
  padding: 0;
}

*, *::after, *::before {
  box-sizing: border-box;
}

main {
background: #f4f4f4;
height: 100vh;
}
`;
