import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import {
	CreateMessageDocument,
	GetAllMessagesDocument,
	GetAllMessagesForRoomDocument,
	Message,
	NewMessageDocument,
} from "../graphql/gen/generated";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useEffect, useState } from "react";
import PrimaryButton from "./Button";
import InputField from "./InputField";
import ChatMessage from "./ChatMessage";

const ChatWrapper = styled("section")`
	height: 70vh;
	width: 100vw;
	overflow-y: scroll;
	scroll-snap-type: y;
	::-webkit-scrollbar {
		width: 20px;
	}
`;

const ChatForm = styled("form")`
	display: flex;
	flex-direction: row;
	width: 100%;
	margin: 1em;
	justify-content: center;
`;

const MessageWrapper = styled("div")`
	display: flex;
	flex-direction: column-reverse;
	scroll-snap-align: end;
`;
interface Inputs {
	body: string;
}
export default function ChatCard({ roomId }: { roomId: string }) {
	const { subscribeToMore, ...result } = useQuery(
		GetAllMessagesForRoomDocument,
		{
			variables: {
				roomId: roomId,
			},
		}
	);

	const [createMessage, {}] = useMutation(CreateMessageDocument);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (eventData) => {
		createMessage({
			variables: {
				body: eventData.body,
				roomId: roomId,
			},
		});
	};
	useEffect(() => {
		subscribeToMore({
			document: NewMessageDocument,
			variables: {
				topic: roomId,
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
	}, [roomId]);

	return (
		<>
			<ChatWrapper id="chat-wrapper">
				<MessageWrapper>
					{result.data ? (
						result.data.getAllMessagesForRoom.messages.map(
							(message: Message, key: number) => (
								<ChatMessage message={message} key={key} />
							)
						)
					) : (
						<p>You are not in a room</p>
					)}
				</MessageWrapper>
			</ChatWrapper>
			<ChatForm id="chat-form" onSubmit={handleSubmit(onSubmit)}>
				<InputField {...register("body")} />
				<PrimaryButton type="submit">Submit</PrimaryButton>
			</ChatForm>
		</>
	);
}
