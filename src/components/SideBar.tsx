import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { enterRoom, leaveRoom } from "../helpers/manageRoomSlice";
import { AppState } from "../helpers/store";

const SideBar = () => {
	const dispatch = useAppDispatch();
	const room = useAppSelector((state: AppState) => ({
		id: state.room.id,
	}));
	const Wrapper = styled("aside")`
		width: 100vw;
		height: 6.25rem;
		background-color: red;
		display: flex;
	`;
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

	return (
		<Wrapper>
			<h1>Pick a room</h1>
			{currentRoom === "0" ? (
				<>
					<button onClick={() => handleRoom("9")}>enter room 9</button>
					<button onClick={() => handleRoom("8")}>enter room 8</button>
				</>
			) : (
				<>
					<p>you are in room {currentRoom}</p>
					<button onClick={() => handleRoom("9")}>enter room 9</button>
					<button onClick={() => handleRoom("8")}>enter room 8</button>
				</>
			)}
		</Wrapper>
	);
};
export default SideBar;
