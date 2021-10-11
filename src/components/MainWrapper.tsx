import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 0px;
	
`;
export default function MainWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Wrapper>{children}</Wrapper>;
}
