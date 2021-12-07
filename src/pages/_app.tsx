import "../assets/styles/global.css";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import client from "../client";
import { Provider as ReduxProvider } from "react-redux";
import store from "../helpers/store";

const theme = {
	colors: {
		primary: "#4361ee",
		secondary: "#48cae4",
		detail: "#caf0f8",
		white: "#fff",
		black: "#1F1F1F",
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
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<Component {...pageProps} />
				</ThemeProvider>
			</ApolloProvider>
		</ReduxProvider>
	);
}

export default MyApp;
