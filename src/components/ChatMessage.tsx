import styled from "styled-components";
import { Message } from "../graphql/gen/generated";

interface Props
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	message: Message;
}

const MessageOutline = styled.div`
	border: 1px solid black;
	border-radius: 15px;
	padding: 0.25 1em;
	display: flex;
	flex-direction: column;
	scroll-snap-align: end;
`;

export default function ChatMessage({ message }: Props) {
	return (
		<MessageOutline>
			<p>{message.body}</p>
			<p>{message.sender.username}</p>
		</MessageOutline>
	);
}
