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

const MessageOutputWrapper = styled("section")`
	position: relative;
	flex-grow: 1;
`;

const ChatWrapper = styled("div")`
	max-height: 60vh;
	overflow-y: scroll;
	display: flex;
	flex-direction: column-reverse;
	scroll-snap-align: end;
	scroll-snap-type: y;
`;

const ChatForm = styled("form")`
	display: flex;
	flex-direction: row;
	width: 100%;

	justify-content: center;
`;


const FormWrapper = styled("div")`

	background-color: ${({theme}) => theme.colors.light};
	padding: 4rem 0;

`
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
			// skip: !room.id,
			variables: {
				roomId: room.id,
			},
			fetchPolicy: "network-only",
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
		<MessageOutputWrapper>
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
			<FormWrapper>
				<ChatForm id="chat-form" onSubmit={handleSubmit(onSubmit)}>
					<InputField {...register("body")} />
					<PrimaryButton type="submit">Submit</PrimaryButton>
				</ChatForm>
			</FormWrapper>
		</MessageOutputWrapper>
	);
}
