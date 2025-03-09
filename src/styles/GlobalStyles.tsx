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
    
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-use-select: none;
    user-select: none;

    overflow-x: hidden;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  #root {
    max-width: 430px;
    height: 100%;
    margin: 0 auto;
    background-color: ${colors.Navy};
    color: ${colors.White};

    overflow-x: hidden;
  }

  // Slide Transitions
.transitions-group {
    width: 100vw;
    overflow-x: hidden;
    position: relative;
    -ms-overflow-style: none;
  }

  .transitions-group::-webkit-scrollbar {
    display: none;
  }

  .slide-right-enter {
    z-index: 1;
    transform: scale(1.1);
    transform: translateX(100%);
  }
  .slide-right-enter-active {
    z-index: 1;
    transform: translateX(0);
    transition: transform 300ms ease-in;
  }
  .slide-right-exit {
    z-index: 1;
    transform: translateX(0);
  }
  .slide-right-exit-active {
    z-index: 1;
    transform: translateX(-100%);
    transition: transform 300ms ease-in;
  }

  .slide-left-enter {
    z-index: 1;
    transform: translateX(-100%);
  }
  .slide-left-enter-active {
    z-index: 1;
    transform: translateX(0);
    transition: transform 300ms ease-in;
  }
  .slide-left-exit {
    z-index: 1;
    transform: translateX(0);
  }
  .slide-left-exit-active {
    z-index: 1;
    transform: translateX(100%);
    transition: transform 300ms ease-in;
  }

  .right-enter {
    z-index: 1;
    transform: translateX(100%);
  }
  .right-enter-active {
    z-index: 1;
    transform: translateX(0);
    transition: transform 600ms;
  }
  .right-exit {
    z-index: 0;
    transform: translateX(0);
    transition: transform 600ms;
  }

  .left-enter {
    z-index: 0;
    transform: translateX(0);
    transition: transform 600ms;
  }
  .left-exit {
    z-index: 1;
    transform: translateX(0);
  }
  .left-exit-active {
    z-index: 1;
    transform: translateX(100%);
    transition: transform 600ms;
  }
`;

export default GlobalStyle;
