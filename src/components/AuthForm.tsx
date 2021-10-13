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

const Form = styled.form`
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

	const [loginUser, { data, error, loading }] = useMutation(LoginUserDocument, {
		refetchQueries: [GetMeDocument, "GetMe"],
	});
	const router = useRouter();
	const onSubmit: SubmitHandler<Inputs> = (formData) => {
		loginUser({
			variables: { username: formData.username, password: formData.password },
		}).then(() => {
			if (!loading) {
				if (!error && !data.loginUser.error) router.push("/");
			}
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

	const [registerUser, { data, error, loading }] = useMutation(
		RegisterUserDocument,
		{
			refetchQueries: [GetMeDocument, "GetMe"],
		}
	);
	const router = useRouter();
	const onSubmit: SubmitHandler<RegisterInputs> = (formData) => {
		registerUser({
			variables: {
				username: formData.username,
				password: formData.password,
				confirmPassword: formData.confirmPassword,
			},
		}).then(() => {
			if (!loading) {
				if (!error && !data.registerUser.error) router.push("/");
			}
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
