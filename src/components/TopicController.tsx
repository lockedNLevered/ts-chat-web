import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { enterRoom } from "../helpers/roomSlice";
import ControllerWrapper from "./ControllerWrapper";
import { AppState } from "../helpers/store";
import ActionWrapper from "./ActionWrapper";
import { ControllerButton } from "./Button";

const Header = styled("h1")`
	align-self: center;
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
			<ControllerWrapper
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
			</ControllerWrapper>
		</>
	);
};
export default SideBar;
