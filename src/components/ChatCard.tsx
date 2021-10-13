import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import {
	CreateMessageDocument,
	GetAllMessagesDocument,
	Message,
	NewMessageDocument,
} from "../graphql/gen/generated";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useEffect, useLayoutEffect } from "react";
import PrimaryButton from "./Button";
import InputField from "./InputField";
import ChatMessage from "./ChatMessage";

const Card = styled.div`
	height: 80vh;
	overflow-y: scroll;

	padding: 2em;
	overscroll-behavior-y: contain;
	scroll-snap-type: y proximity;
	display: flex;
	flex-direction: column;
`;

const ChatForm = styled.form`
	scroll-snap-align: end;
	padding: 2em;
	display: flex;
	flex-direction: row;
	width: 100;
`;
interface Inputs {
	body: string;
}
export default function ChatCard() {
	const { subscribeToMore, ...result } = useQuery(GetAllMessagesDocument, {
		variables: {
			offset: 0,
			limit: 15,
		},
	});

	const [createMessage, {}] = useMutation(CreateMessageDocument);
	const {
		register,
		handleSubmit,

		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (eventData) =>
		createMessage({
			variables: {
				body: eventData.body,
			},
		});

	useEffect(() => {
		subscribeToMore({
			document: NewMessageDocument,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const newMessage = subscriptionData.data.newMessage;
				return Object.assign({}, prev, {
					getAllMessages: {
						messages: [...prev.getAllMessages.messages, newMessage],
					},
				});
			},
		});
	}, []);
	return (
		<Card id="chat-card">
			{!result.loading ? (
				result.data.getAllMessages.messages.map(
					(message: Message, key: number) => (
						<ChatMessage message={message} key={key} />
					)
				)
			) : (
				<p>loading</p>
			)}
			<ChatForm id="chat-form" onSubmit={handleSubmit(onSubmit)}>
				<InputField {...register("body")} />
				<PrimaryButton type="submit">Submit</PrimaryButton>
			</ChatForm>
		</Card>
	);
}
