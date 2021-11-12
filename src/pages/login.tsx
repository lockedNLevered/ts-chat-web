import React from "react";
import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import { LoginForm } from "../components/AuthForm";

export default function login() {
	return (
		<MainWrapper>
			<NavBar />
			<h1>Login Page</h1>
			<LoginForm />
		</MainWrapper>
	);
}
