// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    notionApiKey: process.env.NOTION_API_KEY
  }
})
