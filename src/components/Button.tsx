import React from "react";
import styled from "styled-components";

interface Props {
	children: React.ReactNode;
	callback: () => any;
}

const Button = styled.button`
	padding: 0.1em 1em;
	color: white;
    border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.secondary};
    margin: 0em 0.25em;
`;

export default function PrimaryButton({ children, callback }: Props) {
	return <Button onClick={callback}>{children}</Button>;
}
export function SecondaryButton({ children, callback}: Props) {
    return <Button onClick={callback}>{children}</Button>;
}