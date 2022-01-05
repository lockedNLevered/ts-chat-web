import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import ChatCard from "../components/ChatCard";
import TopicController from "../components/TopicController";
import Head from "next/head";
function HomePage() {
	return (
		<>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
					rel="stylesheet"
				/>
			</Head>
			<NavBar />
			<MainWrapper>
				<TopicController />
				<ChatCard />
			</MainWrapper>
		</>
	);
}
export default HomePage;
