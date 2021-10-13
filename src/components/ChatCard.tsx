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

const Card = styled.div`
	height: 100vh;
	overflow-y: scroll;
	border: 1px solid black;
	border-radius: 12px;
	padding: 2em;
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
		<Card>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField {...register("body")} />
				<PrimaryButton type="submit">Submit</PrimaryButton>
			</form>

			{!result.loading ? (
				result.data.getAllMessages.messages.map((message: Message) => (
					<ChatMessage message={message} />
				))
			) : (
				<p>loading</p>
			)}
		</Card>
	);
}
