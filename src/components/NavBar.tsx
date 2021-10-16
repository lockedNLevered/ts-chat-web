import styled from "styled-components";
import PrimaryButton from "./Button";
import NavAuthButtonContainer from "./NavAuthButtonContainer";
import { useRouter } from "next/router";
import { GetMeDocument, User } from "../graphql/gen/generated";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { AppState } from "../helpers/store";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { useEffect } from "react";
import userSlice, { addUser, IUser } from "../helpers/userSlice";

const NavContainer = styled.div`
	color: white;
	background-color: ${({ theme }) => theme.colors.primary};
	padding: 1em;
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid black;
	width: 100%;
	top: 0px;
`;
function NavBar() {
	const router = useRouter();
	const { loading, data } = useQuery(GetMeDocument);
	const dispatch = useAppDispatch();
	const user: IUser = useAppSelector((state: AppState) => ({
		id: state.user.id,
		username: state.user.username,
	}));

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
		navOptions = <p>{user.username}</p>;
	}
	return (
		<NavContainer>
			<p>Ts-Chat</p>
			{navOptions}
		</NavContainer>
	);
}
export default NavBar;
