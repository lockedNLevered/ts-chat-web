import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { enterRoom } from "../helpers/manageRoomSlice";
import { AppState } from "../helpers/store";
import { ControllerButton } from "./Button";
const Wrapper = styled("aside")`
	width: 20vw;
	height: 85vh;
	background-color: ${({ theme }) => theme.colors.primary};
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Header = styled("h1")`
	align-self: center;
`;

const ActionWrapper = styled("div")`
	display: flex;
	align-items: center;
	flex-direction: column;
	overflow-y: auto;
	::-webkit-scrollbar {
		width: 0.9375rem;
	}

	::-webkit-scrollbar-track {
		background-color: ${({ theme }) => theme.colors.white};
	}

	::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.colors.primary};
		border-radius: 0.5rem;
	}

	::-webkit-scrollbar-thumb:hover {
		opacity: 0.7;
	}
`;
const SideBar = () => {
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
	const rooms = [...Array(30).keys()];
	return (
		<Wrapper>
			<Header>Pick a room</Header>
			<ActionWrapper>
				{currentRoom === "0" ? (
					rooms.map((roomId) => (
						<ControllerButton onClick={() => handleRoom(String(roomId))}>
							Room {roomId}
						</ControllerButton>
					))
				) : (
					<>
						{rooms.map((roomId) => (
							<ControllerButton onClick={() => handleRoom(String(roomId))}>
								Room {roomId}
							</ControllerButton>
						))}
					</>
				)}
			</ActionWrapper>
		</Wrapper>
	);
};
export default SideBar;
