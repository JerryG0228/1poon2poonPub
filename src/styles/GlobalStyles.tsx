import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Toss Product Sans';
    touch-action: manipulation; // 터치 확대 방지
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    background-color: ${colors.Navy};
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
    padding: 1rem;
    background-color: ${colors.Navy};
    color: ${colors.White};
  }
`;

export default GlobalStyle;
