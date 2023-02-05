import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
  runtimeConfig: {
    notionApiKey: process.env.NOTION_API_KEY,
    public: {
      activitiesDatabase: '320f54753392429280755f8049f6fc68',
      usersDatabase: '68754924248b4ed6914f0a90d938d1fa'
    }
  },
  unocss: {
    webFonts: {
      fonts: {
        sans: 'Inter'
      }
    }
  }
})
