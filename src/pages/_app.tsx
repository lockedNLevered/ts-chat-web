import type { AppProps /*, AppContext */ } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { client } from "../client";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
	colors: {
		primary: "#4832a8",
		secondary: "#b8afe0",
	},
};



function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default MyApp;
