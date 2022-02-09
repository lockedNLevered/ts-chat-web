import styled from "styled-components";

const ActionWrapper = styled("div")`
	display: flex;
	align-items: center;
	flex-direction: column;
	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0.9375rem;
	}

	::-webkit-scrollbar-track {
		background-color: ${({ theme }) => theme.colors.white};
	}

	::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.colors.primary};
		border-radius: 0.5rem;
	}

	::-webkit-scrollbar-thumb:hover {
		opacity: 0.7;
	}
`;
export default ActionWrapper;
