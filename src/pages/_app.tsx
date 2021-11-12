import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import client from "../client";
import { Provider as ReduxProvider } from "react-redux";
import store from "../helpers/store";

const theme = {
	colors: {
		primary: "#4832a8",
		secondary: "#6E0EDA",
		fontWhite: "#EEE8E8",
		darkPrimary: "#5E5E5E",
		darkSecondary: "#3e3e3e",
		lightGray: "#4C4C4C",
		effectBlue: "#3925F4",
	},
};
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
	background-color: #5E5E5E;
	overflow: hidden;
	
	
  }
  	p {
	  color: white;
  		}
	}

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
