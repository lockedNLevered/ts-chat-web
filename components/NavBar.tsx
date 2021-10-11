import styled from "styled-components";
import PrimaryButton from "./Button";
import NavAuthButtonContainer from "./NavAuthButtonContainer";
import { useRouter } from "next/router";
const NavContainer = styled.div`
	color: white;

	background-color: ${({ theme }) => theme.colors.primary};
	padding: 1em;
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid black;
	width: 100vw;
`;
function NavBar() {
	const router = useRouter();
	return (
		<NavContainer>
			<p>Name</p>
			<NavAuthButtonContainer>
				<PrimaryButton callback={() => router.push("/login")}>
					<p>Login</p>
				</PrimaryButton>
				<PrimaryButton callback={() => null}>
					<p>Register</p>
				</PrimaryButton>
			</NavAuthButtonContainer>
		</NavContainer>
	);
}
export default NavBar;
