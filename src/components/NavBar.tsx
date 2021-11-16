import styled from "styled-components";
import PrimaryButton from "./Button";
import NavAuthButtonContainer from "./NavAuthButtonContainer";
import { useRouter } from "next/router";
import { GetMeDocument, LogoutUserDocument } from "../graphql/gen/generated";
import { useQuery } from "@apollo/client";
import { AppState } from "../helpers/store";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { addUser, IUser, removeUser } from "../helpers/userSlice";
import { useMutation } from "@apollo/client";
import Logo from "./Logo";
import { useRef } from "react";
import React from "react";

const NavContainer = styled("header")`
	color: white;
	background-color: ${({ theme }) => theme.colors.darkPrimary};
	padding: 1rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid black;
	width: 100%;
	top: 0px;
`;
const NavBar = React.forwardRef((props, ref) => {
	const router = useRouter();
	const { loading, data } = useQuery(GetMeDocument);
	const [logoutUser] = useMutation(LogoutUserDocument);
	const dispatch = useAppDispatch();
	const navRef = useRef();
	const user: IUser = useAppSelector((state: AppState) => ({
		id: state.user.id,
		username: state.user.username,
	}));

	function handleLogout(): Promise<void> {
		logoutUser().then(() => dispatch(removeUser()));
	}

	if (!loading && data.getMe.user)
		dispatch(
			addUser({ id: data.getMe.user.id, username: data.getMe.user.username })
		);

	let navOptions = (
		<NavAuthButtonContainer>
			<PrimaryButton onClick={() => router.push("/login")}>Login</PrimaryButton>
			<PrimaryButton onClick={() => router.push("/register")}>
				Register
			</PrimaryButton>
		</NavAuthButtonContainer>
	);
	if (!loading && data.getMe.user) {
		navOptions = (
			<NavAuthButtonContainer>
				<h2>{user.username}</h2>{" "}
				<PrimaryButton onClick={() => handleLogout()}>Logout</PrimaryButton>
			</NavAuthButtonContainer>
		);
	}
	return (
		<NavContainer>
			<Logo />
			{navOptions}
		</NavContainer>
	);
});
export default NavBar;
