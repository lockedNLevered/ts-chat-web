import styled from "styled-components";

export const FeedWrapper = styled("div")`
	height: 70vh;
	overflow-y: scroll;
	scroll-snap-type: y;
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
