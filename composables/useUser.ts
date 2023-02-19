import { useUserStore } from '@/stores/globalStore'

export const useUser = () => {
	const config = useRuntimeConfig();
	const { updatePage } = useNotion();
	const { user, allUsers } = storeToRefs(useUserStore());
	const loading = ref(false);

	const generateUsersLinks = async (): Promise<void> => {
		await Promise.all(
			allUsers.value.map(async (user) => {
				await updatePage(user.id, {
					"Lien unique": {
						url: `${config.public.loginBaseUrl}/${user.id}`,
					},
				});
			})
		);
	};

	const updateUserStatus = async (userId: string): Promise<void> => {
		let status = "A validé";
		if (user.value.status !== "Validé") {
			status = "Validé";
		}

		await updatePage(userId, {
			Status: {
				status: {
					name: status,
				},
			},
		})

		await updateUsers();
	};


	const updateUsers = async (): Promise<void> => {
		const response = await $fetch('/api/users')
		allUsers.value = response

		updateUser(user.value.id)
	};

	const updateUser = (userId: string): void => {
		// find valid user and set store
		const validUser = allUsers.value.find((el) => el.id === userId);
		user.value = validUser!;
	};


	return {
		updateUsers,
		updateUser,
		generateUsersLinks,
		updateUserStatus,
		loading,
	};
};
