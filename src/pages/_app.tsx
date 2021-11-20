import "../assets/styles/global.css"
import type { AppProps } from "next/app";
import { createGlobalStyle, css, ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import client from "../client";
import { Provider as ReduxProvider } from "react-redux";
import store from "../helpers/store";


const theme = {
	colors: {
		primary: "#0077b6",
		secondary: "#90e0ef",
		detail: "#caf0f8",
		white: "#fff",
		black: "#1F1F1F",
	},
};

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    box-sizing: border-box;
	::-webkit-scrollbar {
  width: 0.9375rem;
  
}



::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 

::-webkit-scrollbar-thumb {
  background: #51CB20; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #639A88; 
}

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
