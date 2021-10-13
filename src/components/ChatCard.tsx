import styled from "styled-components";
import { Message } from "../graphql/gen/generated";

interface Props {
	messages: Message[];
}

const Card = styled.div`

`

export default function ChatCard({ messages }: Props) {
	return (
		<>
			{" "}
			{messages.map((item: Message, key) => (
				<p key={key}>{item.body}</p>
			))}
		</>
	);
}
