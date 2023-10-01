import { createGlobalStyle } from "styled-components";
import SuitBold from "./fonts/SUIT-Bold.otf";
import SuitExtraBold from "./fonts/SUIT-ExtraBold.otf";
import SuitExtraLight from "./fonts/SUIT-ExtraLight.otf";
import SuitHeavy from "./fonts/SUIT-Heavy.otf";
import SuitLight from "./fonts/SUIT-Light.otf";
import SuitMedium from "./fonts/SUIT-Medium.otf";
import SuitRegular from "./fonts/SUIT-Regular.otf";
import SuitSemiBold from "./fonts/SUIT-SemiBold.otf";
import SuitThin from "./fonts/SUIT-Thin.otf";

export const GlobalStyle = createGlobalStyle`
  :root {
    --vh: 100%;
   }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    border: 0;
    padding: 0;
    vertical-align: baseline;
    font: inherit;
    font-size: 100%;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  *[hidden] {
      display: none;
  }
  body {
    touch-action: manipulation;
    line-height: 1;

    width: 100%;
    /* width:39rem; */
    /* height: 56.8rem; */
    height: 100%;
    /* border:1px solid black; */
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  /* 위에가 styled-reset 내용 */

  * {
    box-sizing: border-box;
  } 
  html {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
    
    scroll-behavior: smooth;

    font-family: sans-serif;

    user-select: none;

    display: flex;
    justify-content: center;

    /* 미디어쿼리 적용 예정 */
    font-size: 62.5%;
  
  }
  ul, li {
    padding-left: 0rem;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input, button {
    outline: none; 
    border: none;
    background-color: transparent;
  }
  button {
    cursor: pointer;
    padding: 0;
  }
  input {
    appearance: none;
    
    &:focus {
      outline: none;
    }
  }

  @font-face{
  font-family: "SuitBold";
  src: url(${SuitBold}) format("truetype");
}


@font-face{
  font-family: "SuitExtraBold";
  src: url(${SuitExtraBold}) format("truetype");
}

@font-face{
  font-family: "SuitExtraLight";
  src: url(${SuitExtraLight}) format("truetype");
}

@font-face{
  font-family: "SuitHeavy";
  src: url(${SuitHeavy}) format("truetype");
}

@font-face{
  font-family: "SuitLight";
  src: url(${SuitLight}) format("truetype");
}

@font-face{
  font-family: "SuitMedium";
  src: url(${SuitMedium}) format("truetype");
}

@font-face{
  font-family: "SuitRegular";
  src: url(${SuitRegular}) format("truetype");
}
@font-face{
  font-family: "SuitSemiBold";
  src: url(${SuitSemiBold}) format("truetype");
}
@font-face{
  font-family: "SuitThin";
  src: url(${SuitThin}) format("truetype");
}
`;
