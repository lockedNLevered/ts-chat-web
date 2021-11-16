import React from "react";
import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = styled("button")`
	padding: 0.5rem;
	color: white;
	border-radius: 0.3125rem;
	border: 0.0625rem solid black;
	background-color: ${({ theme }) => theme.colors.secondary};
	margin: 0em 1rem;
	cursor: pointer;
	transition: 1s;
	:hover {
		background-color: ${({ theme }) => theme.colors.effectBlue};
	}
`;

const CButton = styled("button")`
	padding: 0.5rem 1.5rem;
	color: white;
	border: 0.0625rem solid black;
	background-color: ${({ theme }) => theme.colors.secondary};
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

export const ControllerButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		return <CButton ref={ref} {...props} />;
	}
);
