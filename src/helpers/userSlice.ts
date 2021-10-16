import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
	id: number | null;
	username: string | null;
}

const initialState: IUser = {
	id: null,
	username: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<NonNullable<IUser>>) => {
			state.id = action.payload.id;
			state.username = action.payload.username;
		},
		removeUser: (state) => {
			state.id = null;
			state.username = null;
		},
	},
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer