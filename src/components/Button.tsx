import React from "react";
import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
const Button = styled("button")`
	padding: 0.5rem;
	color: ${({ theme }) => theme.colors.black};
	border-radius: 0.3125rem;

	background-color: ${({ theme }) => theme.colors.secondary};
	margin: 0em 1rem;
	cursor: pointer;
	transition: 1s;
	:hover {
		background-color: ${({ theme }) => theme.colors.primary};
	}
`;

const LButton = styled("a")`
	padding: 0.5rem;
	display: inline-block;
	color: ${({ theme }) => theme.colors.black};
	border-radius: 0.3125rem;
	background-color: ${({ theme }) => theme.colors.secondary};
	margin: 0em 1rem;
	cursor: pointer;
	transition: 1s;
	:hover {
		background-color: ${({ theme }) => theme.colors.primary};
	}
`;

const CButton = styled("button")`
	padding: 0.5rem 1.5rem;
	color: ${({ theme }) => theme.colors.black};
	background-color: ${({ theme }) => theme.colors.secondary};
	cursor: pointer;
	transition: 0.5s;
	width: 100%;

	:hover {
		background-color: ${({ theme }) => theme.colors.primary};
		opacity: 0.7;
		color: ${({ theme }) => theme.colors.white};
	}
`;
export const LinkButton = React.forwardRef<HTMLAnchorElement, AnchorProps>(
	(props, ref) => {
		return <LButton ref={ref} {...props} />;
	}
);

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		return <Button ref={ref} {...props} />;
	}
);
export default PrimaryButton;

export const ControllerButton = React.forwardRef<
	HTMLButtonElement,
	ButtonProps
>((props, ref) => {
	return <CButton ref={ref} {...props} />;
});
