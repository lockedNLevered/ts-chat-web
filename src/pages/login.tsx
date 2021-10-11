import React from "react";
import styled from "styled-components";
import InputField from "../components/InputField";
import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginForm } from "../components/AuthForm";



export default function login() {
	return (
		<MainWrapper>
			<NavBar />
			<p>Login Page</p>
			<LoginForm />
		</MainWrapper>
	);
}
