import React from "react";
import { render } from "react-dom";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://192.168.1.4:32022/graphql',
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    background: {
      default: '#121212',
      paper: '#0d1117'
    },
    mode: 'dark',
    primary: {
      main: '#0d1117',
      dark: '#010409'
    },
    secondary: {
      main: '#21262d',
      dark: '#21262d'
    }
  },
  typography: {
    h3: {
      fontFamily: "Heebo",
      fontWeightLight: 200,
    }
  }
});

render(
  <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
