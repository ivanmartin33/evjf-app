import { Activity } from "~~/types/IActivity";
export const sanitizeActivities = (activitiesData: any): Activity[] => {
	return activitiesData.map((el: any) => {
		const image = el.properties.Image.files[0]?.file.url || null;
		const description = el.properties.Description.rich_text[0].text.content;

		return {
			id: el.id,
			name: el.properties.Nom.title[0].text.content,
			day: el.properties.Jour.select.name,
			price: el.properties.Prix.number,
			image,
			description,
			userRelation: el.properties.User.relation,
		};
	});
};
