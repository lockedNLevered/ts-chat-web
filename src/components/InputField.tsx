import React from "react";
import styled from "styled-components";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputField = styled.input`
	border-radius: 5px;
	min-height: 4em;
	min-width: 80%;
	padding: 0.5em 1em;
	border: 2px solid transparent;
	background-color: ${({ theme }) => theme.colors.darkSecondary};
	color: ${({ theme }) => theme.colors.fontWhite};
	outline: none;
	transition: 0.5s;
	:focus {
		border-color: ${({ theme }) => theme.colors.darkPrimary};
		border-width: 2px;
	}
	::placeholder {
		color: white;
	}

	:hover {
		background-color: ${({ theme }) => theme.colors.darkPrimary};
	}
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <InputField ref={ref} placeholder="Lets chat..." {...props} />;
});
export default Input;
