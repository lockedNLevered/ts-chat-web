import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { enterRoom, leaveRoom } from "../helpers/manageRoomSlice";
import { AppState } from "../helpers/store";
import { RoomButton } from "./Button";
const SideBar = () => {
	const dispatch = useAppDispatch();
	const room = useAppSelector((state: AppState) => ({
		id: state.room.id,
	}));

	const Wrapper = styled("aside")`
		width: 100vw;
		height: 5rem;
		background-color: ${({ theme }) => theme.colors.darkSecondary};
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	`;

	const Header = styled("h1")`
		align-self: center;
		color: ${({ theme }) => theme.colors.fontWhite};
	`;

	const ActionWrapper = styled("div")`
		display: flex;
		align-items: center;
		justify-content: space-around;
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
	const rooms = [...Array(10).keys()];
	return (
		<Wrapper>
			<Header>Pick a room</Header>
			<ActionWrapper>
				{currentRoom === "0" ? (
					rooms.map((roomId) => (
						<RoomButton onClick={() => handleRoom(String(roomId))}>
							Enter Room {roomId}
						</RoomButton>
					))
				) : (
					<>
						<p>you are in room {currentRoom}</p>
						{rooms.map((roomId) => (
							<RoomButton onClick={() => handleRoom(String(roomId))}>
								Enter Room {roomId}
							</RoomButton>
						))}
					</>
				)}
			</ActionWrapper>
		</Wrapper>
	);
};
export default SideBar;
