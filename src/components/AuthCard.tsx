import React from "react";
import styled from "styled-components";

const Card = styled("section")`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 80vh;
`;

const AuthCard = ({ children }: { children: React.ReactNode }) => {
	return <Card>{children}</Card>;
};
export default AuthCard;
