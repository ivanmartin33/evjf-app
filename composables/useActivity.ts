import type { Page, PageProperty } from "notion-api-types/responses";
import { useActivityStore, useUserStore } from "@/stores/globalStore";
import { Activity, DEFAULT_ACTIVITY_LIST } from "@/types/IActivity";

export const useActivity = () => {
	const config = useRuntimeConfig();
	const { getDatabase, updatePage } = useNotion();
	const loading = ref(false);
	const { allUsers, user } = storeToRefs(useUserStore());
	const { activities } = storeToRefs(useActivityStore());
	const { fetchAllUsers } = useUser();

	const getActivities = async (databaseId: string): Promise<void> => {
		const response = await getDatabase(databaseId);
		activities.value = await formatActivities(response.results);
	};

	const formatActivities = async (activitiesData: any): Promise<Activity[]> => {
		await fetchAllUsers(config.public.usersDatabase);

		return activitiesData.map((el: any) => {
			const userRelation = el.properties.User.relation.map((item: any) => {
				const userData = allUsers.value.find((ele) => ele.id === item.id);
				return { id: userData?.id, name: userData?.name };
			});

			const image = el.properties.Image.files[0]?.file.url || null;
			const description = el.properties.Description.rich_text[0].text.content;

			return {
				id: el.id,
				name: el.properties.Nom.title[0].text.content,
				day: el.properties.Jour.select.name,
				price: el.properties.Prix.number,
				image,
				description,
				userRelation,
			};
		});
	};

	const updateUserActivities = async (
		activityId: string,
		userId: string,
		userActivities: any
	): Promise<void> => {
		const result = userActivities.some((el: any) => el.id === activityId);

		if (result) {
			const index = userActivities.findIndex((el: any) => el.id === activityId);
			userActivities.splice(index, 1);
		} else {
			userActivities.push({ id: activityId });
		}

		// update activities store
		user.value.activities = userActivities;

		// const index = activities.value.findIndex((el) => el.id === activityId)

		// const relation = activities.value[index].userRelation
		// const indexRelation = relation?.findIndex((el) => el.id === userId)

		// if (indexRelation !== (-1)) {
		//   activities.value[index].userRelation?.splice(indexRelation!, 1)
		// } else {
		//   activities.value[index].userRelation?.push({ id: activityId, name: user.value.name })
		// }

		// upadte notion
		await updatePage(userId, {
			Activités: {
				relation: userActivities,
			},
		});

		await getActivities(config.public.activitiesDatabase);
	};

	return { getActivities, updateUserActivities, loading };
};
