import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import {
	CreateMessageDocument,
	GetAllMessagesForRoomDocument,
	Message,
	NewMessageDocument,
} from "../graphql/gen/generated";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useEffect } from "react";
import PrimaryButton from "./Button";
import InputField from "./InputField";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../helpers/hooks";
import { AppState } from "../helpers/store";

const ChatWrapper = styled("section")`
	height: 60vh;
	width: 100vw;
	overflow-y: scroll;
	display: flex;
	flex-direction: column-reverse;
`;

const ChatForm = styled("form")`
	display: flex;
	flex-direction: row;
	width: 100%;
	margin: 1em;
	justify-content: center;
	position: fixed;
	bottom: 0.25rem;
`;

interface Inputs {
	body: string;
}
export default function ChatCard() {
	const room = useAppSelector((state: AppState) => ({
		id: state.room.id,
	}));
	const { subscribeToMore, ...result } = useQuery(
		GetAllMessagesForRoomDocument,
		{
			skip: !room.id,
			variables: {
				roomId: room.id,
				offsetPagination: {
					offset: 0,
					limit: 20,
				},
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
				roomId: room.id,
			},
		});
	};

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

	return (
		<>
			<ChatWrapper id="chat-wrapper">
				{result.data ? (
					result.data.getAllMessagesForRoom.messages.map(
						(message: Message, key: number) => (
							<ChatMessage message={message} key={key} />
						)
					)
				) : (
					<p>You are not in a room</p>
				)}
			</ChatWrapper>
			<ChatForm id="chat-form" onSubmit={handleSubmit(onSubmit)}>
				<InputField {...register("body")} />
				<PrimaryButton type="submit">Submit</PrimaryButton>
			</ChatForm>
		</>
	);
}
