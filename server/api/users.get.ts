import { User } from "@/types/IUser";
import { sanitizeUser } from "../utils/user";
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	try {
		const res: any = await $fetch(
			`https://api.notion.com/v1/databases/${config.public.usersDatabase}/query`,
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

		let users: User[] | undefined = [];
		res.results.forEach((el: any) => {
			const formattedUser = sanitizeUser(el);
			users?.push(formattedUser);
		});

		return users;
	} catch (e: any) {
		return [];
		sendError(event, e);
	}
});
