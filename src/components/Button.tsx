import React from "react";
import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = styled("button")`
	padding: 0.5rm 1rm;
	color: white;
	border-radius: 0.3125rem;
	border: 0.0625rem solid black;
	background-color: ${({ theme }) => theme.colors.secondary};
	margin: 0em 0.25em;
	cursor: pointer;
	transition: 1s;
	:hover {
		background-color: ${({ theme }) => theme.colors.effectBlue};
	}
`;

const RButton = styled("button")`
	padding: 1rm 1.5rm;
	color: white;
	border-radius: 1.5rem;
	border: 0.0625rem solid black;
	background-color: ${({ theme }) => theme.colors.secondary};
	margin: 0em 0.25em;
	cursor: pointer;
	transition: 0.5s;
	:hover {
		background-color: ${({ theme }) => theme.colors.effectBlue};
		opacity: 0.8;
	}
`;

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		return <Button ref={ref} {...props} />;
	}
);
export default PrimaryButton;

export const RoomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		return <RButton ref={ref} {...props} />;
	}
);
