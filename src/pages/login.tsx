import React from "react";
import styled from "styled-components";
import InputField from "../components/InputField";
import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";




export default function login() {
	return (
		<MainWrapper>
			<NavBar />
			<p>Login Page</p>

			<InputField placeholder="Username" />
			<InputField placeholder="Password" />
			<InputField placeholder="Confirm Password" />
		</MainWrapper>
	);
}
