import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { CreateMessageDocument } from "../graphql/gen/generated";
import { useAppSelector } from "../helpers/hooks";
import { AppState } from "../helpers/store";
import PrimaryButton from "./Button";
import InputField from "./InputField";

const Form = styled("form")`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	position: absolute;
	background-color: white;
	bottom: 0;
	left: 0;
	right: 0;
`;
interface Inputs {
	body: string;
}

const ChatForm = () => {
	const room = useAppSelector((state: AppState) => ({
		id: state.room.id,
	}));
	const [createMessage, {}] = useMutation(CreateMessageDocument);
	const { register, handleSubmit } = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (eventData) => {
		createMessage({
			variables: {
				body: eventData.body,
				roomId: room.id,
			},
		});
	};
	return (
		<Form id="chat-form" onSubmit={handleSubmit(onSubmit)}>
			<InputField {...register("body")} />
			<PrimaryButton type="submit">Submit</PrimaryButton>
		</Form>
	);
};
export default ChatForm;
