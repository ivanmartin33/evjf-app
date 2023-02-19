import { sanitizeActivities } from "../utils/activity";
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	try {
		const res: any = await $fetch(
			`https://api.notion.com/v1/databases/${config.public.activitiesDatabase}/query`,
			{
				method: "POST",
				mode: "no-cors",
				headers: {
					Authorization: `Bearer ${config.notionApiKey}`,
					"Notion-Version": "2022-06-28",
					"Content-Type": "application/json",
				},
			}
		);

		const activities = sanitizeActivities(res.results);

		return activities;
	} catch (e: any) {
		console.log(e);
		sendError(event, e);
	}
});
