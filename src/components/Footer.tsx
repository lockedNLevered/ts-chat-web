import styled from "styled-components";

const FooterWrapper = styled("footer")`
	height: 10vh;
	background-color: ${({ theme }) => theme.colors.primary};
`;

const Footer = () => {
	return (
		<FooterWrapper>
			<h1>TS-Chat</h1>
		</FooterWrapper>
	);
};
export default Footer;
