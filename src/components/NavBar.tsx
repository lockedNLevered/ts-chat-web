import styled from "styled-components";
import PrimaryButton from "./Button";
import NavAuthButtonContainer from "./NavAuthButtonContainer";
import { useRouter } from "next/router";
const NavContainer = styled.div`
	color: white;

	background-color: ${({ theme }) => theme.colors.primary};
	padding: 1em;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid black;
	width: 100vw;
	top: 0px;
	position: sticky;
`;
function NavBar() {
	const router = useRouter();
	return (
		<NavContainer>
			<p>Ts-Chat</p>
			<NavAuthButtonContainer>
				<PrimaryButton onClick={() => router.push("/login")}>
					Login
				</PrimaryButton>
				<PrimaryButton onClick={() => router.push('/register')}>Register</PrimaryButton>
			</NavAuthButtonContainer>
		</NavContainer>
	);
}
export default NavBar;
