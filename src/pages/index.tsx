import { useQuery } from "@apollo/client";
import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import { GetUserDocument } from "../graphql/gen/generated";

function HomePage() {

	const { loading, error, data } = useQuery(GetUserDocument, {
		variables: { username: "shaynel"}
	});

	if (!loading) console.log(data)
	return (
		<MainWrapper>
			<NavBar />
			<p>hello</p>
		</MainWrapper>
	);
}
export default HomePage;
