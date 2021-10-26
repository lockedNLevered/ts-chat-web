import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import client from "../client";
import { Provider as ReduxProvider } from "react-redux";
import store from "../helpers/store";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
	overflow: hidden;
	background-color: #5E5E5E;
  }
  p {
	  color: white;
  }
`;

const theme = {
	colors: {
		primary: "#4832a8",
		secondary: "#b8afe0",
		fontWhite: "#EEE8E8",
	},
};

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ReduxProvider store={store}>
			<ApolloProvider client={client}>
				<GlobalStyle />
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</ApolloProvider>
		</ReduxProvider>
	);
}

export default MyApp;
