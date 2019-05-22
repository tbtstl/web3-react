import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { StateProvider } from "./state";
import AppContainer from "./components/AppContainer";

function App() {
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <AppContainer>you made it</AppContainer>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
