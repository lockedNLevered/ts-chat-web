import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import {
	CreateMessageDocument,
	GetAllMessagesDocument,
	Message,
	NewMessageDocument,
} from "../graphql/gen/generated";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useEffect } from "react";
import PrimaryButton from "./Button";
import InputField from "./InputField";
import ChatMessage from "./ChatMessage";

const ChatWrapper = styled("section")`
	height: 70vh;
	width: 100vw;
	overflow-y: scroll;
	scroll-snap-type: y;
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
						messages: [newMessage, ...prev.getAllMessages.messages],
					},
				});
			},
		});
	}, []);
	return (
		<>
			<ChatWrapper id="chat-wrapper">
				<MessageWrapper>
					{!result.loading ? (
						result.data.getAllMessages.messages.map(
							(message: Message, key: number) => (
								<ChatMessage message={message} key={key} />
							)
						)
					) : (
						<p>loading</p>
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
