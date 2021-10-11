import React from "react";
import styled from "styled-components";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputField = styled.input`
	border-radius: 10px;
	padding: 0.5em;
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <InputField ref={ref} {...props} />;
});
export default Input;
