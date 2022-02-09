import styled from "styled-components";

const ControllerWrapper = styled("aside")`
	width: 20vw;
	height: 85vh;
	background-color: ${({ theme }) => theme.colors.primary};
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	left: -25rem;
	z-index: 2;
	@media (min-width: 48rem) {
		position: relative;
		left: 0;
	}
`;
export default ControllerWrapper;
