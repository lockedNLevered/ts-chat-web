import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoom {
	id: string | null;
}

const initialState: IRoom = {
	id: null,
};

export const userSlice = createSlice({
	name: "room",
	initialState,
	reducers: {
		enterRoom: (state, action: PayloadAction<NonNullable<IRoom>>) => {
			state.id = action.payload.id;
		},
		leaveRoom: (state) => {
			state.id = null;
		},
	},
});

export const { enterRoom, leaveRoom } = userSlice.actions;
export default userSlice.reducer;
