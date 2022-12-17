import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

html, body {
  margin: 0;
  padding: 0;
  background: #f4f4f4;
}

*, *::after, *::before {
  box-sizing: border-box;
}

main {
height: 100vh;
max-width: 1120px;
}

ul {
  padding: 0;
  list-style-type: none;
}
a {
  text-decoration: none;
  letter-spacing: 1px;

} 
/* img {
  object-fit: cover;
}  */

.page {
  width: 90vw;
  margin: 0 auto;
}
.page {
  min-height: calc(100vh - (6rem + 4rem));
}
`;
