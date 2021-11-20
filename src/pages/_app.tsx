import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import client from "../client";
import { Provider as ReduxProvider } from "react-redux";
import store from "../helpers/store";

const theme = {
	colors: {
		primary: "#51CB20",
		secondary: "#639A88",
		fontWhite: "#EEE8E8",
		darkPrimary: "#2708A0",
		darkSecondary: "#3A5683",
		lightGray: "#76B041",
		effectBlue: "#51CB20",
		white: "#fff",
	},
};
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
	

	}
	body {
		overflow: hidden;
	}
	
`;

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
