import React from "react";
import styled from "styled-components";
import { Message } from "../graphql/gen/generated";
import { useAppSelector } from "../helpers/hooks";
import { AppState } from "../helpers/store";
import { MessageSender } from "./MessageSender";

interface Props
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	message: Message;
}

const MessageOutline = styled("div")`
	background-color: ${({ theme }) => theme.colors.white};
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	padding: 1em 2em;
`;

export default function ChatMessage({ message }: Props) {
	const user = useAppSelector((state: AppState) => ({
		id: state.user.id,
		username: state.user.username,
	}));
	return (
		<>
			<MessageOutline>
				<p>{message.body}</p>
				<MessageSender
					color={user.id == parseInt(message.sender.id) ? "red" : "black"}
				>
					- {message.sender.username}
				</MessageSender>
				<p>sent at: {message.createdAt}</p>
				<p>In Room: {message.roomId}</p>
				<p>In Room: {message.id}</p>
			</MessageOutline>
		</>
	);
}
