import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import roomReducer from "./roomSlice";
import asideReducer from "./asideSlice";

export function makeStore() {
	return configureStore({
		reducer: { user: userReducer, room: roomReducer, aside: asideReducer },
	});
}
const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
