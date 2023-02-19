import { User } from "@/types/IUser";
export const sanitizeUser = (userData: any): User => {
	const user: User = {
		id: userData.id,
		name: userData.properties.Nom.title[0].text.content,
		email: userData.properties.email.email,
		total:
			userData.properties["Prix Total"] === null
				? userData.properties["Prix Total"].number
				: null,
		activities: userData.properties["Activités"].relation,
		isAdmin: userData.properties.isAdmin.checkbox,
		status: userData.properties.Status.status.name,
	};
	return user;
};
