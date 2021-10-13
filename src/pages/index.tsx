import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { resultKeyNameFromField } from "@apollo/client/utilities";
import { useEffect, useState } from "react";
import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import {
	CreateMessageDocument,
	GetAllMessagesDocument,
	GetAllMessagesQuery,
	GetUserDocument,
	Message,
	NewMessageDocument,
} from "../graphql/gen/generated";
import InputField from "../components/InputField";

import PrimaryButton from "../components/Button";
import ChatCard from "../components/ChatCard";

function HomePage() {
	return (
		<MainWrapper>
			<NavBar />
			<p>hello lets chat</p>

			<ChatCard />
		</MainWrapper>
	);
}
export default HomePage;
