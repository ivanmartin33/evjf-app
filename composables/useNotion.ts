export const useNotion = () => {
	const config = useRuntimeConfig();
	const loading = ref(false);

	const getDatabase = async (databaseId: string): Promise<any> => {
		try {
			const res = await $fetch<any>("/api/getDatabase", {
				method: "POST",
				body: {
					databaseId,
				},
			});
			return res;
		} catch (err: any) {
			throw Error(err);
		}
	};

	const getPage = async (pageId: string): Promise<any> => {
		const { data, error } = await useFetch(
			`https://api.notion.com/v1/pages/${pageId}`,
			{
				method: "GET",
				mode: "no-cors",
				headers: {
					Authorization: `Bearer ${config.notionApiKey}`,
					"Notion-Version": "2022-06-28",
					"Content-Type": "application/json",
				},
			}
		);

		if (error.value) {
			console.log(error.value);
			throw error.value;
		}
		// const response = await notion.databases.query({ database_id: databaseId, page_size: 100 });
		return data.value;
	};

	const updatePage = async (pageId: string, properties: any): Promise<any> => {
		try {
			const res = await $fetch("/api/update", {
				method: "POST",
				body: {
					pageId,
					properties,
				},
			});
			return res;
		} catch (err: any) {
			throw createError({ statusMessage: err.message });
		}
	};

	return { updatePage, getDatabase, loading };
};
