import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser, type UserWithId } from "./users/slice.ts";

const persistenceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);

		window.localStorage.setItem(
			"__redux__state__",
			JSON.stringify(store.getState()),
		);
	};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const previousState = store.getState();
	next(action);

	if (type === "users/deleteUserById") {
		const userIdToRemove = payload;
		const userToRemove = previousState.users.find(
			(user: UserWithId) => user.id === userIdToRemove,
		);

		fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`)
			.then((res) => {
				if (res.ok) return toast.success("Eliminado correctamente");

				toast.error("Error al borrar");
				if (userToRemove) store.dispatch(rollbackUser(userToRemove));
			})
			.catch(() => {
				if (userToRemove) store.dispatch(rollbackUser(userToRemove));

				toast.error("Ha ocurrido un error inesperado");
			});
	}
};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			persistenceLocalStorageMiddleware,
			syncWithDatabase,
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
