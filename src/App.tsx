import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import "./firebase-messaging-sw.js";
import Loading from "./pages/Loading.js";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";

export default function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <GlobalStyle />
          <Router />
        </Suspense>
      </ThemeProvider>
    </RecoilRoot>
  );
}
