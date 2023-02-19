import { useUserStore } from "~~/stores/globalStore";

export const useAuth = () => {

	const { updateUsers } = useUser();
	const { user, allUsers } = storeToRefs(useUserStore());

	const checkId = async (userId: string): Promise<boolean> => {

		if (allUsers.value.length === 0) {
			allUsers.value = await $fetch("/api/users");
		}

		// find valid user and set store
		const validUser = allUsers.value.find((el) => el.id === userId);
		user.value = validUser!;

		if (validUser) return true;
		else return false;
	};

	const checkAdmin = async (userId: string): Promise<boolean> => {

		if (allUsers.value.length === 0) {
			allUsers.value = await $fetch("/api/users");
		}

		const validUser = allUsers.value.find((u) => u.id === userId);

		if (!validUser?.isAdmin) return false;
		return true;
	};

	return { checkId, checkAdmin };
};
