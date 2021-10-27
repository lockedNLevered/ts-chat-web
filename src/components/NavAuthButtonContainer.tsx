import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-item: center;
`;

export default function NavAuthButtonContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Container>{children}</Container>;
}
