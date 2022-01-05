import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoom {
	id: string;
}

const initialState: IRoom = {
	id: "1",
};

export const userSlice = createSlice({
	name: "room",
	initialState,
	reducers: {
		enterRoom: (state, action: PayloadAction<NonNullable<IRoom>>) => {
			state.id = action.payload.id;
		},
		leaveRoom: (state) => {
			state.id = "1";
		},
	},
});

export const { enterRoom, leaveRoom } = userSlice.actions;
export default userSlice.reducer;
