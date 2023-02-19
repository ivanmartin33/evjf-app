import { useActivityStore, useUserStore } from "@/stores/globalStore";

export const useActivity = () => {
	const loading = ref(false);
	const { updatePage } = useNotion()
	const { user } = storeToRefs(useUserStore());
	const { activities } = storeToRefs(useActivityStore());

	const updateActivities = async (): Promise<void> => {
		const response = await $fetch('/api/activities', {
			method: 'POST'
		})
		activities.value = response
	};


	const updateUserActivities = async (
		activityId: string,
		userId: string,
		userActivities: { id?: string }[]
	): Promise<void> => {
		const isPresent = userActivities.some((el: any) => el.id === activityId);

		if (isPresent) {
			const index = userActivities.findIndex((el: any) => el.id === activityId);
			userActivities.splice(index, 1);
		} else {
			userActivities.push({ id: activityId });
		}

		// update activities store
		user.value.activities = userActivities;


		// update user in notion


		await updatePage(userId, {


			Activités: {
				relation: userActivities,
			}


		})

		// update activities
		await updateActivities()
	};

	return { updateActivities, updateUserActivities, loading };
};
