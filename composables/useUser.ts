import { User } from "@/types/IUser";

export const useUser = () => {
	const config = useRuntimeConfig();
	const { getDatabase, updatePage } = useNotion();
	const { user, allUsers } = useStore();
	const loading = ref(false);

	const fetchUser = async (
		databaseId: string,
		userId: string
	): Promise<void> => {
		const res = await getDatabase(databaseId);

		const result = res.results.find((el: any) => el.id === userId);

		if (result === undefined) {
			throw Error("Aucun participant pour ce lien !");
		}
		user.value = formatUser(result);
	};

	const fetchAllUsers = async (databaseId: string): Promise<User[]> => {
		const response = await getDatabase(databaseId);
		const users: any = [];
		response.results.forEach((el: any) => {
			const formattedUser = formatUser(el);
			users.push(formattedUser);
		});
		allUsers.value = users;
		return users;
	};

	const formatUser = (data: any): User => {
		const user: User = {
			id: data.id,
			name: data.properties.Nom.title[0].text.content,
			email: data.properties.email.email,
			total:
				data.properties["Prix Total"] === null
					? data.properties["Prix Total"].number
					: null,
			activities: data.properties["Activités"].relation,
			isAdmin: data.properties.isAdmin.checkbox,
			status: data.properties.Status.status.name,
		};
		return user;
	};

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
		});

		await fetchUser(config.public.usersDatabase, userId);
	};

	return {
		fetchUser,
		formatUser,
		fetchAllUsers,
		generateUsersLinks,
		updateUserStatus,
		loading,
	};
};
