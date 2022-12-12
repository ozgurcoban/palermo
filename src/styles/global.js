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

ul {
  padding: 0;
  list-style-type: none;
}
a {
  text-decoration: none;
  letter-spacing: 1px;

} 
.img {
  object-fit: cover;
} 
`;
