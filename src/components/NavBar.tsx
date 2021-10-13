import styled from "styled-components";
import PrimaryButton from "./Button";
import NavAuthButtonContainer from "./NavAuthButtonContainer";
import { useRouter } from "next/router";
import { GetMeDocument } from "../graphql/gen/generated";
import { useQuery } from "@apollo/client";
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
	let navOptions = (
		<NavAuthButtonContainer>
			<PrimaryButton onClick={() => router.push("/login")}>Login</PrimaryButton>
			<PrimaryButton onClick={() => router.push("/register")}>
				Register
			</PrimaryButton>
		</NavAuthButtonContainer>
	);
	if (!loading && data.getMe.user) {
		navOptions = <p>{data.getMe.user.username}</p>;
	}
	return (
		<NavContainer>
			<p>Ts-Chat</p>
			{navOptions}
		</NavContainer>
	);
}
export default NavBar;
