import React from "react";
import styled from "styled-components";
import InputField from "./InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import PrimaryButton from "./Button";
import { useMutation } from "@apollo/client";
import {
	GetMeDocument,
	LoginUserDocument,
	RegisterUserDocument,
} from "../graphql/gen/generated";
import { useRouter } from "next/router";
import { addUser } from "../helpers/userSlice";
import { useAppDispatch } from "../helpers/hooks";

const Form = styled("form")`
	display: flex;
	flex-direction: column;
	margin: auto;
`;

interface Inputs {
	username: string;
	password: string;
}

interface RegisterInputs extends Inputs {
	confirmPassword: string;
}

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const [loginUser] = useMutation(LoginUserDocument, {
		refetchQueries: [GetMeDocument, "GetMe"],
		onCompleted: (data) => {
			dispatch(
				addUser({
					id: data.loginUser.user.id,
					username: data.loginUser.user.username,
				})
			);
			router.push("/");
		},
	});
	const router = useRouter();
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<Inputs> = (formData) => {
		loginUser({
			variables: { username: formData.username, password: formData.password },
		});
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputField
				placeholder="Username"
				{...register("username", { required: true })}
			/>
			<InputField
				placeholder="Password"
				{...register("password", { required: true })}
			/>
			{errors.password && <span>This field is required</span>}
			<PrimaryButton type="submit">Submit</PrimaryButton>
		</Form>
	);
}

export function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInputs>();
	const dispatch = useAppDispatch();
	const [registerUser] = useMutation(RegisterUserDocument, {
		refetchQueries: [GetMeDocument, "GetMe"],
		onCompleted: (data) => {
			console.log(data);
			dispatch(
				addUser({
					id: data.registerUser.user.id,
					username: data.registerUser.user.username,
				})
			);
			router.push("/");
		},
	});
	const router = useRouter();
	const onSubmit: SubmitHandler<RegisterInputs> = (formData) => {
		registerUser({
			variables: {
				username: formData.username,
				password: formData.password,
				confirmPassword: formData.confirmPassword,
			},
		});
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputField
				placeholder="Username"
				{...register("username", { required: true })}
			/>
			<InputField
				placeholder="Password"
				{...register("password", { required: true })}
			/>
			<InputField
				placeholder="Confirm Password"
				{...register("confirmPassword", { required: true })}
			/>
			{errors.password && <span>This field is required</span>}
			<PrimaryButton type="submit">Submit</PrimaryButton>
		</Form>
	);
}
