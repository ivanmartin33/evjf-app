import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
	modules: ["@unocss/nuxt", "@pinia/nuxt"],
	runtimeConfig: {
		notionApiKey: process.env.NOTION_API_KEY,
		public: {
			loginBaseUrl: process.env.LOGIN_BASE_URL,
			activitiesDatabase: "320f54753392429280755f8049f6fc68",
			usersDatabase: "68754924248b4ed6914f0a90d938d1fa",
		},
	},
	pinia: {
		autoImports: ["defineStore", "storeToRefs"],
	},
	unocss: {
		webFonts: {
			fonts: {
				sans: "Inter",
			},
		},
	},
});
