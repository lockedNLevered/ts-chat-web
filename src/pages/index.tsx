import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { resultKeyNameFromField } from "@apollo/client/utilities";
import { useEffect, useState } from "react";
import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import {
	CreateMessageDocument,
	GetAllMessagesDocument,
	GetAllMessagesQuery,
	GetUserDocument,
	Message,
	NewMessageDocument,
} from "../graphql/gen/generated";
import InputField from "../components/InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryButton from "../components/Button";
import ChatCard from "../components/ChatCard";

interface Inputs {
	body: string;
}

function HomePage() {
	const { subscribeToMore, ...result } = useQuery(GetAllMessagesDocument);
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
		<MainWrapper>
			<NavBar />
			<p>hello lets chat</p>
			{!result.loading ? (
				<ChatCard messages={result.data.getAllMessages.messages} />
			) : (
				<p>...loading</p>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField {...register("body")} />
				<PrimaryButton type="submit">Submit</PrimaryButton>
			</form>
		</MainWrapper>
	);
}
export default HomePage;
