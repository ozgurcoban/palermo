import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

html, body {
  margin: 0;
  padding: 0;
  background: #f4f4f4;
  line-height: 1.7em;
}

*, *::after, *::before {
  box-sizing: border-box;
}

main {
max-width: 1120px;
}

ul {
  padding: 0;
  list-style-type: none;
}

h1 {
  font-size: 3rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  line-height: 3rem;
}

h2 {
  font-size: 2.5rem;
  text-transform: capitalize;
}

h3 {
  font-size: 2rem;
  letter-spacing: 1px;
  line-height: 3rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 2rem;
  
}

a {
  text-decoration: none;
  letter-spacing: 1px;
  text-transform: capitalize;
} 

/* img {
  object-fit: cover;
}  */

/* .page {
  width: 90vw;
  margin: 0 auto;
}

.page {
  min-height: calc(100vh - (6rem + 4rem));
} */

.btn {
  padding: 0.7rem 1rem;
  font-size: 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
}
`;
