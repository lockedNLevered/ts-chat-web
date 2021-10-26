import styled from "styled-components";
import { Message } from "../graphql/gen/generated";
import { useAppSelector } from "../helpers/hooks";
import { AppState } from "../helpers/store";

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
	display: flex;
	flex-direction: column;
	margin-top: 1em;
	padding: 1em 2em;
	color: ${({ theme }) => theme.colors.fontWhite};
`;

export default function ChatMessage({ message }: Props) {
	const user = useAppSelector((state: AppState) => ({
		id: state.user.id,
		username: state.user.username,
	}));
	return (
		<>
			<MessageOutline
				//fix type
				backgroundColor={
					user.id == parseInt(message.sender.id) ? "blue" : "gray"
				}
			>
				<p>{message.body}</p>
				<p>- {message.sender.username}</p>
				<p>sent at: {message.createdAt}</p>
			</MessageOutline>
		</>
	);
}
