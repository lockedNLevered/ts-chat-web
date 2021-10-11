import React from "react";
import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import { RegisterForm } from "../components/AuthForm";

export default function register() {
	return (
		<MainWrapper>
			<NavBar />
			<p>Register Page</p>
			<RegisterForm />
		</MainWrapper>
	);
}
