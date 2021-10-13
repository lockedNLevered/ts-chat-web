import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
	
`;
export default function MainWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Wrapper>{children}</Wrapper>;
}
