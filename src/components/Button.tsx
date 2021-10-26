import React from "react";
import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = styled("button")`
	padding: 0.5em 1em;
	color: white;
	border-radius: 15px;
	background-color: ${({ theme }) => theme.colors.secondary};
	margin: 0em 0.25em;
`;

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		return <Button ref={ref} {...props} />;
	}
);
export default PrimaryButton;
