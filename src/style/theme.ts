import { DefaultTheme } from "styled-components";

const colors = {
  green: "#98CDB3",
  gray1: "#D9D9D9",
  gray2: "#D4D6DD",
};

export type ColorsTypes = typeof colors;

interface Font {
  fontFamily: string;
  weight: number;
  size: number;
  lineHeight: number;
  letterSpacing: number;
}

function FONT({ fontFamily, weight, size, lineHeight, letterSpacing }: Font): string {
  return `
    font-family: ${fontFamily};
    font-weight : ${weight};
    font-size : ${size}rem;
    line-height : ${lineHeight}rem;
    letter-spacing : ${letterSpacing}rem;
    `;
}

const fonts = {
  title: FONT({ fontFamily: "SuitBold", weight: 700, size: 2.0, lineHeight: 2.6, letterSpacing: 0 }),
  sub: FONT({ fontFamily: "SuitSemiBold", weight: 700, size: 1.5, lineHeight: 2.6, letterSpacing: 0 }),
  caption: FONT({ fontFamily: "SuitRegular", weight: 700, size: 1.3, lineHeight: 2.6, letterSpacing: 0 }),
  content: FONT({ fontFamily: "SuitLight", weight: 500, size: 1.3, lineHeight: 2.6, letterSpacing: 0 }),
};

export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};
