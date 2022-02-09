import { useQuery } from "@apollo/client";
import styled from "styled-components";
import {
	GetAllMessagesForRoomDocument,
	Message,
	NewMessageDocument,
} from "../graphql/gen/generated";
import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../helpers/hooks";
import { AppState } from "../helpers/store";
import ChatForm from "./ChatForm";
import { FeedWrapper } from "./FeedWrapper";
import { ChatWrapper } from "./ChatWrapper";

const Wrapper = styled("section")`
	flex-grow: 1;
	height: 80vh;
	position: relative;
	width: 100%;
`;

export default function ChatCard() {
	const room = useAppSelector((state: AppState) => ({
		id: state.room.id,
	}));
	const { subscribeToMore, ...result } = useQuery(
		GetAllMessagesForRoomDocument,
		{
			// skip: !room.id,
			variables: {
				roomId: room.id,
			},
			fetchPolicy: "network-only",
		}
	);

	useEffect(() => {
		subscribeToMore({
			document: NewMessageDocument,
			variables: {
				topic: room.id,
			},
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const newMessage = subscriptionData.data.newMessage;
				return Object.assign({}, prev, {
					getAllMessagesForRoom: {
						messages: [newMessage, ...prev.getAllMessagesForRoom.messages],
					},
				});
			},
		});
	}, [room]);

	function renderMessages() {
		if (result.data) {
			return result.data.getAllMessagesForRoom.messages.map(
				(message: Message, key: number) => (
					<ChatMessage message={message} key={key} />
				)
			);
		} else {
			return <p>You are not in a room</p>;
		}
	}

	return (
		<Wrapper>
			<FeedWrapper>
				<ChatWrapper>{renderMessages()}</ChatWrapper>
			</FeedWrapper>
			<ChatForm />
		</Wrapper>
	);
}
