import React from "react";
import styled from "styled-components";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputField = styled.input`
	border-radius: 5px;
	min-height: 4em;
	width 100%;
	margin: 1rem 0;
	padding: 0.5em 1em;
	border: 2px solid ${({ theme }) => theme.colors.black};
	background-color: ${({ theme }) => theme.colors.detail};
	color: ${({ theme }) => theme.colors.black};
	outline: none;
	transition: 0.5s;
	:focus {
		border-color: ${({ theme }) => theme.colors.darkPrimary};
		border-width: 2px;
	}
	::placeholder {
		color: ${({ theme }) => theme.colors.black};
	}

	:hover {
		opacity: 0.7;
	}
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <InputField ref={ref} placeholder="Lets chat..." {...props} />;
});
export default Input;
