import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://static.toss.im/tps/main.css');
@import url('https://static.toss.im/tps/others.css');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Toss Product Sans';
  }

  html, body {
    width: 100%;
    height: 100%;
    background-color: lightgray;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  #root {
    max-width: 393px;
    height: 100%;
    margin: 0 auto;
    background-color: white;
  }
`;

export default GlobalStyle;
