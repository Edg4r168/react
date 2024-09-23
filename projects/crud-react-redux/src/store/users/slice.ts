import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Yazman Rodriguez",
		email: "yazmanito@gmail.com",
		github: "yazmanito",
	},
	{
		id: "2",
		name: "John Doe",
		email: "leo@gmail.com",
		github: "leo",
	},
	{
		id: "3",
		name: "Haakon Dahlberg",
		email: "haakon@gmail.com",
		github: "midudev",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const initialState: UserWithId[] = (() => {
	const persistedState = window.localStorage.getItem("__redux__state__");

	if (persistedState) return JSON.parse(persistedState).users;

	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();

			return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefiened = state.some(
				(user) => user.id === action.payload.id,
			);

			if (!isUserAlreadyDefiened) return [...state, action.payload];
		},
	},
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
