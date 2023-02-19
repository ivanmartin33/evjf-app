import { Ref } from "vue";
import { Activity } from "~~/types/IActivity";
import { User, DEFAULT_USER } from "~~/types/IUser";

export const useActivityStore = defineStore("activity", () => {
	const activities: Ref<Activity[] | null> = ref(null);
	const total = ref(0)

	const getActivityParticipants = (activityId: string) => {
		const activity = activities.value?.find(el => el.id === activityId)
		const participants = activity?.userRelation?.map(userRel => {

			const user = useUserStore().allUsers.find(user => user.id === userRel.id)
			return {
				id: user?.id,
				name: user?.name
			}
		})

		return participants
	};


	return {
		activities,
		total,
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
