import { Ref } from "vue";
import { Activity } from "~~/types/IActivity";
import { User, DEFAULT_USER } from "~~/types/IUser";

export const useActivityStore = defineStore("activity", () => {
	const activities: Ref<Activity[] | null> = ref(null);

	const getActivityParticipants = (
		activityId: string
	): {
		id: string;
		name: string;
	}[] => {
		const act = activities.value?.find((el) => el.id === activityId);
		if (act === undefined) return [];
		else {
			return act.userRelation as {
				id: string;
				name: string;
			}[];
		}
	};
	return {
		activities,
		getActivityParticipants,
	};
});

export const useUserStore = defineStore("user", () => {
	const user = ref<User>(DEFAULT_USER);
	const allUsers = ref<User[]>([]);

	const getOtherUsers = (databaseId: string): void => {
		const users = allUsers.value?.filter((el) => el.id !== user.value.id);
		allUsers.value = users;
	};

	return {
		user,
		allUsers,
		getOtherUsers,
	};
});
