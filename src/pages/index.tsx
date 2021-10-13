import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
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
