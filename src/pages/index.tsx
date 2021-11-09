import MainWrapper from "../components/MainWrapper";
import NavBar from "../components/NavBar";
import ChatCard from "../components/ChatCard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { AppState } from "../helpers/store";
import { enterRoom } from "../helpers/manageRoomSlice";

function HomePage() {
	const dispatch = useAppDispatch();
	const room = useAppSelector((state: AppState) => ({
		id: state.room.id,
	}));

	const [currentRoom, setCurrentRoom] = useState<string>("0");
	const handleRoom = (roomId: string) => {
		dispatch(
			enterRoom({
				id: roomId,
			})
		);
	};

	useEffect(() => {
		if (!room.id) {
			setCurrentRoom("0");
		} else {
			setCurrentRoom(room.id);
		}
	}, [room.id]);
	console.log("current room is", currentRoom);
	return (
		<MainWrapper>
			<NavBar />

			{currentRoom === "0" ? (
				<>
					<button onClick={() => handleRoom("9")}>enter room 9</button>
					<button onClick={() => handleRoom("8")}>enter room 8</button>
				</>
			) : (
				<p>you are in room {currentRoom}</p>
			)}

			<ChatCard roomId={room.id as string} />
		</MainWrapper>
	);
}
export default HomePage;
