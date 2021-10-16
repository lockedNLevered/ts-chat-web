import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const wsLink = process.browser
	? new WebSocketLink({
			// if you instantiate in the server, the error will be thrown
			uri: `ws://localhost:4000/graphql`,
			options: {
				reconnect: true,
			},
	  })
	: null;

const httplink = new HttpLink({
	uri: "http://localhost:4000/graphql",
	credentials: "include",
});

const splitLink = process.browser
	? split(
			//only create the split in the browser
			// split based on operation type
			({ query }) => {
				//@ts-ignore
				const { kind, operation } = getMainDefinition(query);
				return kind === "OperationDefinition" && operation === "subscription";
			},
			wsLink as WebSocketLink,
			httplink
	  )
	: httplink;
export default new ApolloClient({
	ssrMode: true,
	link: splitLink,
	cache: new InMemoryCache(),
});
