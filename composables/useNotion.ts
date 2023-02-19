export const useNotion = () => {

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

	return { updatePage };
};
