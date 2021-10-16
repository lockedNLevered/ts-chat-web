import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { GetMeDocument, Message } from "../graphql/gen/generated";

interface IMessageOutline {
	backgroundColor: string;
}
interface Props
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	message: Message;
}

const MessageOutline = styled("div")<IMessageOutline>`
	background-color: ${(props) => props.backgroundColor};
	border: 1px solid black;
	border-radius: 15px;
	padding: 0.5em 1em;
	display: flex;
	flex-direction: column;
	margin-top: 1em;
	color: ${({ theme }) => theme.colors.fontWhite};
`;

export default function ChatMessage({ message }: Props) {
	const { loading, data } = useQuery(GetMeDocument);

	return (
		<>
			{!loading ? (
				<MessageOutline
					backgroundColor={
						data.getMe.user.id === message.sender.id ? "blue" : "gray"
					}
				>
					<p>{message.body}</p>
					<p>- {message.sender.username}</p>
				</MessageOutline>
			) : (
				<p>Loading</p>
			)}
		</>
	);
}
