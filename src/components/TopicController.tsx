import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { enterRoom } from "../helpers/roomSlice";

import { AppState } from "../helpers/store";
import { ControllerButton } from "./Button";
const Wrapper = styled("aside")`
	width: 20vw;
	height: 85vh;
	background-color: ${({ theme }) => theme.colors.primary};
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	left: -25rem;
	z-index: 2;
	@media (min-width: 48rem) {
		position: relative;
		left: 0;
	}
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

const Tab = styled("div")`
	background-color: red;
	position: fixed;
	left: 0;
	width: 50px;
	height: 2.5rem;
	top: 20vh;
	z-index: 2;
`;

const SideBar = () => {
	const dispatch = useAppDispatch();
	const room = useAppSelector((state: AppState) => ({
		id: state.room.id,
	}));
	const topicController = useAppSelector((state: AppState) => ({
		aside: state.aside.open,
	}));

	const [currentRoom, setCurrentRoom] = useState<string>("1");
	const handleRoom = (roomId: string) => {
		dispatch(
			enterRoom({
				id: roomId,
			})
		);
	};

	useEffect(() => {
		setCurrentRoom(room.id);
	}, [room.id]);

	const rooms = [...new Array(10).keys()].map((_, id) => id + 1);
	return (
		<>
			<Wrapper
				id="topic-controller"
				className={`${topicController.aside ? "aside--open" : "aside--close"}`}
			>
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
		</>
	);
};
export default SideBar;
