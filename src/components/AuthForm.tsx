import React from "react";
import styled from "styled-components";
import InputField from "./InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryButton from "./Button";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin: auto;
`;

interface Inputs {
	username: string;
	password: string;
}

export function LoginForm() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
	console.log(watch("username"));
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputField placeholder="Username" {...register("username")} />
			<InputField placeholder="Password" {...register("password")} />
			{errors.password && <span>This field is required</span>}
			<PrimaryButton type="submit">Submit</PrimaryButton>
		</Form>
	);
}
