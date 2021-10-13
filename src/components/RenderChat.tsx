// temp component for testing output of subscription

import { useEffect } from "react";
import { Message } from "../graphql/gen/generated";

interface Props {
	messages: Message[];
}

export default function RenderChat({ messages }: Props) {
	return (
		<>
			{" "}
			{messages.map((item: Message, key) => (
				<p key={key}>{item.body}</p>
			))}
		</>
	);
}
