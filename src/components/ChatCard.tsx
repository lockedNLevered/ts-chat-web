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

const Wrapper = styled("section")`
	flex-grow: 1;
	height: 80vh;
	position: relative;
	width: 100%;
`;

const FeedWrapper = styled("div")`
	height: 70vh;
	overflow-y: scroll;
	scroll-snap-type: y;
	::-webkit-scrollbar {
		width: 0.9375rem;
	}

	::-webkit-scrollbar-track {
		background-color: ${({ theme }) => theme.colors.white};
	}

	::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.colors.primary};
		border-radius: 0.5rem;
	}

	::-webkit-scrollbar-thumb:hover {
		opacity: 0.7;
	}
`;

const ChatWrapper = styled("div")`
	display: flex;
	flex-direction: column-reverse;
	scroll-snap-align: end;
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
