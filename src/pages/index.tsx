import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import ChatCard from "../components/ChatCard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { AppState } from "../helpers/store";
import { enterRoom } from "../helpers/manageRoomSlice";
import SideBar from "../components/SideBar";
function HomePage() {
	const room = useAppSelector((state: AppState) => ({
		id: state.room.id,
	}));

	
	
	return (
		<>
			<NavBar />
			<MainWrapper>
				<SideBar />
				

				<ChatCard roomId={room.id as string} />
			</MainWrapper>
		</>
	);
}
export default HomePage;
