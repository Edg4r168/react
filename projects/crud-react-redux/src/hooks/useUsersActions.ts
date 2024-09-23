import {
	User,
	addNewUser,
	deleteUserById,
	type UserId,
} from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUsersActions = () => {
	const dispatch = useAppDispatch();

	const add = (user: User) => {
		dispatch(addNewUser(user));
	};

	const remove = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { add, remove };
};
