import React from "react";
import styled from "styled-components";

interface SenderProps {
	color: string;
}
type ParagraphProps = React.HtmlHTMLAttributes<HTMLParagraphElement>;

const Sender = styled("p")<SenderProps>`
	color: ${(props) => props.color || "white"};
	font-weight: 600;
	font-size: 1.5em;
`;

export const MessageSender = React.forwardRef<
	HTMLParagraphElement,
	ParagraphProps & SenderProps
>((props, ref) => {
	return <Sender ref={ref} {...props} color={props.color}></Sender>;
});
