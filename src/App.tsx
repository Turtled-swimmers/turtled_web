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
    <Suspense fallback={<Loading />}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </RecoilRoot>
    </Suspense>
  );
}
