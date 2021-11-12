import React from "react";
import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = styled("button")`
	padding: 0.5em 1em;
	color: white;
	border-radius: 5px;
	border: 1px solid black;
	background-color: ${({ theme }) => theme.colors.secondary};
	margin: 0em 0.25em;
	:hover {
		background-color: ${({ theme }) => theme.colors.effectBlue};
	}
`;

const RButton = styled("button")`
	padding: 0.5em 1em;
	color: white;
	border-radius: 5px;
	border: 1px solid black;
	background-color: ${({ theme }) => theme.colors.secondary};
	margin: 0em 0.25em;
	:hover {
		background-color: ${({ theme }) => theme.colors.effectBlue};
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
		return <Button ref={ref} {...props} />;
	}
);
