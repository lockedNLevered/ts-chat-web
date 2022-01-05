import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoom {
	open: boolean;
}

const initialState: IRoom = {
	open: false,
};

export const asideSlice = createSlice({
	name: "aside",
	initialState,
	reducers: {
		toggle: (state) => {
			state.open = true;
		},
	},
});

export const { toggle } = asideSlice.actions;
export default asideSlice.reducer;
