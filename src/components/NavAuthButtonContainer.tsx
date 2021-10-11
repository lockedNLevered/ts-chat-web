import React from "react";
import styled from "styled-components";

const Container = styled.div`
	justify-content: space-between;
`;

export default function NavAuthButtonContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Container>{children}</Container>;
}
