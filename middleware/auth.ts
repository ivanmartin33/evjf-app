import { useUserStore } from "@/stores/globalStore";
export default defineNuxtRouteMiddleware(async (to, from) => {
	const { checkId } = useAuth();
	const { user } = useUserStore();
	const userId = to.path.replace("/", "");
	if (user.id === "") {
		const isValidId = await checkId(userId);
		if (!isValidId) {
			return navigateTo("/");
		}
	}
});
