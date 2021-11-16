import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import ChatCard from "../components/ChatCard";
import TopicController from "../components/TopicController";
import { useRef } from "react";
function HomePage() {
	
	return (
		<>
			<NavBar/>
			<MainWrapper>
				<TopicController />

				<ChatCard />
			</MainWrapper>
		</>
	);
}
export default HomePage;
