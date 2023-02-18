import { useUserStore } from "~~/stores/globalStore";
import { User } from "~~/types/IUser";
export const useAuth = () => {
	const config = useRuntimeConfig();
	const { fetchAllUsers } = useUser();
	const { user, allUsers } = storeToRefs(useUserStore());

	const checkId = async (userId: string): Promise<boolean> => {
		let fetchUsers: User[] = [];
		if (allUsers.value.length === 0) {
			fetchUsers = await fetchAllUsers(config.public.usersDatabase);
		}

		// find valid user and set store
		const validUser = fetchUsers.find((el) => el.id === userId);
		user.value = validUser!;
		allUsers.value = fetchUsers;
		if (validUser) return true;
		else return false;
	};

	const checkAdmin = async (userId: string): Promise<boolean> => {
		await fetchAllUsers(config.public.usersDatabase);

		const validUser = allUsers.value.find((u) => u.id === userId);

		if (!validUser?.isAdmin) return false;
		return true;
	};

	return { checkId, checkAdmin };
};
