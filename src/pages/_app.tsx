import type { AppProps /*, AppContext */ } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
	createHttpLink,
} from "@apollo/client";

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



const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
	credentials: "include"
});

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
