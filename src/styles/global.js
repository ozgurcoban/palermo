import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

html, body {
  margin: 0;
  padding: 0;
  background: #f4f4f4;
  line-height: 1.7em;
  /* letter-spacing: 1px; */
}

*, *::after, *::before {
  box-sizing: border-box;
}

main {
}

ul {
  padding: 0;
  list-style-type: none;
}

h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  letter-spacing: 4px;
  text-transform: uppercase;
  line-height: 3rem;
}

h2 {
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 1.5;
}

h3 {
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: 1px;
  line-height: 3rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 2rem;
}

p {
   font-size: clamp(1rem, 5vw, 1.3rem);
  margin-bottom: 1rem;
  letter-spacing: 0.05rem;
}

a {
  text-decoration: none;
  color: ${({ theme }) => theme.primaryDark}
  
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
  font-size: clamp(1rem, 5vw, 1.1rem);
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 300;
}
`;
